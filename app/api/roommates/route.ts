import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// 💡 1. 내 룸메이트 프로필 조회 (GET)
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ profile: null }, { status: 200 });
    }

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      include: {
        roommate_profiles: {
          // 💡 프론트엔드에서 아바타 등 유저 정보를 함께 읽을 수 있도록 include 추가
          include: {
            users: true,
          },
        },
      },
    });

    const profile =
      user?.roommate_profiles && user.roommate_profiles.length > 0
        ? user.roommate_profiles[0]
        : null;

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("프로필 조회 실패:", error);
    return NextResponse.json(
      { error: "프로필 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 💡 2. 룸메이트 프로필 생성 및 업데이트 (POST)
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      include: { roommate_profiles: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "사용자 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      matchingActive,
      desiredCity,
      budgetMin,
      budgetMax,
      wakeUpTime,
      sleepTime,
      cleanlinessLevel,
      smoking,
      petsOk,
      preferredGender,
      moveInDate,
      selfIntro,
      age,
      isAgePublic,
      // 💡 신규 추가: 성별, 직업, 연락처 3종
      gender,
      occupation,
      phone,
      email,
      kakaoId,
      // 💡 추가: 프로필 사진 URL (선택)
      profilePhotoUrl,
    } = body;

    // 💡 필수 입력란 검사 강화 (성별, 휴대폰번호, 이메일 필수!)
    if (
      !desiredCity ||
      !moveInDate ||
      !selfIntro ||
      !gender ||
      !phone ||
      !email
    ) {
      return NextResponse.json(
        {
          error:
            "필수 입력란(성별, 지역, 입주희망일, 휴대폰 번호, 이메일 등)을 모두 채워주세요.",
        },
        { status: 400 }
      );
    }

    // 💡 1. 전달받은 프로필 사진 URL이 있으면 user 테이블에 반영
    if (profilePhotoUrl !== undefined) {
      await prisma.users.update({
        where: { id: user.id },
        data: { profile_photo_url: profilePhotoUrl || null },
      });
    }

    const wakeDate = wakeUpTime
      ? new Date(`1970-01-01T${wakeUpTime}:00Z`)
      : undefined;
    const sleepDate = sleepTime
      ? new Date(`1970-01-01T${sleepTime}:00Z`)
      : undefined;

    const profileData = {
      matching_active: matchingActive ?? true,
      desired_city: desiredCity,
      budget_min: Number(budgetMin),
      budget_max: Number(budgetMax),
      wake_up_time: wakeDate,
      sleep_time: sleepDate,
      cleanliness_level: Number(cleanlinessLevel),
      smoking: Boolean(smoking),
      pets_ok: Boolean(petsOk),
      preferred_roommate_gender: preferredGender || "Any",
      move_in_date: new Date(moveInDate),
      self_intro: selfIntro,
      age: age ? Number(age) : null,
      is_age_public: isAgePublic ?? true,
      // 💡 DB 컬럼 매핑
      gender: gender, // 'M' | 'F' | 'Other'
      occupation: occupation || null, // 직업 (선택)
      phone: phone, // 휴대폰 번호 (필수)
      email: email, // 이메일 (필수)
      kakao_id: kakaoId || null, // 카카오톡 ID (선택)
    };

    let savedProfile;
    if (user.roommate_profiles && user.roommate_profiles.length > 0) {
      savedProfile = await prisma.roommate_profiles.update({
        where: { id: user.roommate_profiles[0].id },
        data: profileData,
      });
    } else {
      savedProfile = await prisma.roommate_profiles.create({
        data: {
          ...profileData,
          user_id: user.id,
        },
      });
    }

    return NextResponse.json({ success: true, profile: savedProfile });
  } catch (error) {
    console.error("룸메이트 프로필 저장 에러:", error);
    return NextResponse.json(
      { error: "프로필 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 💡 3. 내 룸메이트 프로필 삭제 (DELETE)
export async function DELETE() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      include: { roommate_profiles: true },
    });

    if (!user || !user.roommate_profiles?.[0]) {
      return NextResponse.json(
        { error: "삭제할 프로필이 없습니다." },
        { status: 404 }
      );
    }

    await prisma.roommate_profiles.delete({
      where: { id: user.roommate_profiles[0].id },
    });

    return NextResponse.json(
      { success: true, message: "프로필이 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("프로필 삭제 에러:", error);
    return NextResponse.json(
      { error: "프로필 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
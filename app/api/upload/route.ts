import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

// .env에 있는 Supabase URL과 Key를 사용
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
// Service Role Key 또는 Anon Key 사용 (가급적 SUPABASE_SERVICE_ROLE_KEY 권장)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "업로드할 파일이 없습니다." }, { status: 400 });
    }

    // 파일 이름 확장자 추출 및 고유 파일명 생성 (예: 1712345678_profile.png)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `roommate-profiles/${fileName}`;

    // ArrayBuffer를 Buffer로 변환하여 Supabase Storage에 업로드
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("profile-photos") // 💡 1단계에서 만든 버킷 이름!
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Supabase 스토리지 업로드 에러:", error);
      throw error;
    }

    // Public URL 가져오기
    const { data: publicUrlData } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      imageUrl: publicUrlData.publicUrl,
    });
  } catch (error: any) {
    console.error("이미지 업로드 실패:", error);
    return NextResponse.json(
      { error: "이미지 업로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
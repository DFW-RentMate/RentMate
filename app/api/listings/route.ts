import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';


export async function POST(request: Request) {
  // 1. 로그인 확인
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  // 2. 현재 유저의 DB id 조회 (owner_id로 쓸 것)
  const currentUser = await prisma.users.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!currentUser) {
    return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
  }

  // 3. body 파싱
  const body = await request.json();
  const {
    title, description, roomType, rentPrice, deposit, moveInDate,
    contactPhone, contactKakao, addressRaw, city, latitude, longitude,
    genderPreference,
    petsAllowed, smokingAllowed, parkingAvailable, furnished,
    electricityIncluded, waterIncluded, gasIncluded, internetIncluded, trashIncluded,
    hasWasher, hasDryer, hasRefrigerator, hasAc, hasHeating, hasTv,
    amenitiesEtc,
    photoUrls, // string[] — 이미 업로드된 사진 URL들
  } = body;

  try {
    // 4. 매물 생성 + 사진 nested create
    const listing = await prisma.listings.create({
      data: {
        title,
        description: description || null,
        room_type: roomType,               // 이미 영문 enum ('Private' 등)
        rent_price: Number(rentPrice),
        deposit: deposit ? Number(deposit) : null,
        move_in_date: moveInDate ? new Date(moveInDate) : null,
        contact_phone: contactPhone || null,
        contact_kakao: contactKakao || null,
        address_raw: addressRaw || null,
        city: city || null,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        gender_preference: genderPreference,   // 이미 영문 enum ('Any' 등)
        pets_allowed: petsAllowed,
        smoking_allowed: smokingAllowed,
        parking_available: parkingAvailable,
        furnished: furnished,
        electricity_included: electricityIncluded,
        water_included: waterIncluded,
        gas_included: gasIncluded,
        internet_included: internetIncluded,
        trash_included: trashIncluded,
        has_washer: hasWasher,
        has_dryer: hasDryer,
        has_refrigerator: hasRefrigerator,
        has_ac: hasAc,
        has_heating: hasHeating,
        has_tv: hasTv,
        amenities_etc: amenitiesEtc || null,
        status: 'active',
        // 관계: 작성자 연결 (owner_id를 직접 넣는 대신 users 관계로)
        users: {
          connect: { id: currentUser.id },
        },
        // 사진: nested create (listing_photos 테이블에 자동 저장)
        listing_photos: photoUrls?.length
          ? {
              create: photoUrls.map((url: string, index: number) => ({
                url,
                sort_order: index, // 첫 번째가 대표
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json({ id: listing.id });
  } catch (error) {
    console.error('listing create error:', error);
    return NextResponse.json({ error: '매물 등록 실패' }, { status: 500 });
  }
}
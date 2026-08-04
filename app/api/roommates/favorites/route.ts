// app/api/roommates/favorites/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // 💡 1. PrismaPg 어댑터 import 추가

// 💡 2. adapter를 넣어서 PrismaClient 생성 (page.tsx와 동일한 방식)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// 💡 찜하기 추가 (POST)
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const { targetProfileId } = await req.json();

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: '유저를 찾을 수 없습니다.' }, { status: 404 });
    }

    // DB에 찜 기록 추가
    await prisma.roommate_favorites.create({
      data: {
        user_id: user.id,
        target_profile_id: targetProfileId,
      },
    });

    return NextResponse.json({ success: true, message: '찜 목록에 추가되었습니다.' });
  } catch (error) {
    console.error('찜하기 POST 에러:', error);
    return NextResponse.json({ error: '찜하기 처리에 실패했습니다.' }, { status: 500 });
  }
}

// 💡 찜하기 취소 (DELETE)
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const { targetProfileId } = await req.json();

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: '유저를 찾을 수 없습니다.' }, { status: 404 });
    }

    // DB에서 찜 기록 삭제
    await prisma.roommate_favorites.deleteMany({
      where: {
        user_id: user.id,
        target_profile_id: targetProfileId,
      },
    });

    return NextResponse.json({ success: true, message: '찜 목록에서 삭제되었습니다.' });
  } catch (error) {
    console.error('찜하기 DELETE 에러:', error);
    return NextResponse.json({ error: '찜하기 취소에 실패했습니다.' }, { status: 500 });
  }
}
import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('DB URL:', process.env.DATABASE_URL);
  // 유저 생성
  const user1 = await prisma.users.create({
    data: {
      email: 'chulsoo@example.com',
      auth_provider: 'google',
      auth_provider_id: 'google-test-001',
      name: '김철수',
      gender: 'M',
      profile_photo_url: 'https://i.pravatar.cc/150?u=user-101',
      occupation_type: 'UTD 대학원생',
      is_verified: true,
    },
  });

  const user2 = await prisma.users.create({
    data: {
      email: 'younghee@example.com',
      auth_provider: 'google',
      auth_provider_id: 'google-test-002',
      name: '이영희',
      gender: 'F',
      profile_photo_url: 'https://i.pravatar.cc/150?u=user-102',
      occupation_type: '직장인 (Plano)',
      is_verified: true,
    },
  });

  const user3 = await prisma.users.create({
    data: {
      email: 'jimin@example.com',
      auth_provider: 'kakao',
      auth_provider_id: 'kakao-test-003',
      name: '박지민',
      gender: 'F',
      profile_photo_url: 'https://i.pravatar.cc/150?u=user-103',
      occupation_type: 'UTD 학부생',
      is_verified: false,
    },
  });

  console.log('✅ 유저 3명 생성');

  // 매물 생성 (listing_photos 같이 생성)
  await prisma.listings.create({
    data: {
      owner_id: user1.id,
      title: 'UTD 차로 5분 거리, 깨끗한 마스터 베드룸 렌트합니다',
      description:
        'UTD 북쪽 조용한 주택가입니다. 화장실 단독으로 사용하시고, H마트도 차로 10분 거리에 있습니다.',
      room_type: 'Master_Bedroom',
      rent_price: 850,
      deposit: 850,
      city: 'Richardson',
      move_in_date: new Date('2026-08-01'),
      gender_preference: 'M',
      pets_allowed: false,
      parking_available: true,
      furnished: true,
      electricity_included: true,
      water_included: true,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
            sort_order: 0,
          },
          {
            url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
            sort_order: 1,
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user2.id,
      title: '플라노 H마트 도보 5분! 여성 전용 쉐어룸',
      description:
        '새로 리모델링한 아파트입니다. 거실 쉐어하실 깔끔한 여성분 찾아요.',
      room_type: 'Shared',
      rent_price: 550,
      deposit: 500,
      city: 'Plano',
      move_in_date: new Date('2026-07-15'),
      gender_preference: 'F',
      pets_allowed: false,
      parking_available: false,
      furnished: true,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
            sort_order: 0,
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user3.id,
      title: '프리스코 조용한 동네 개인방 (Private Room)',
      description:
        '직장인 환영합니다. 주차 공간 넉넉하고 짐(Gym)이랑 수영장 있는 아파트입니다.',
      room_type: 'Private',
      rent_price: 700,
      deposit: 700,
      city: 'Frisco',
      move_in_date: new Date('2026-07-10'),
      gender_preference: 'Any',
      pets_allowed: true,
      parking_available: true,
      furnished: false,
      electricity_included: true,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
            sort_order: 0,
          },
        ],
      },
    },
  });

  console.log('✅ 매물 3개 생성 완료');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

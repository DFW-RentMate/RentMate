import 'dotenv/config';
import {
  PrismaClient,
  room_type_enum,
  preference_gender_enum,
} from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.listing_photos.deleteMany();
  await prisma.listings.deleteMany();
  await prisma.users.deleteMany();
  console.log('🗑️ 기존 데이터 삭제');

  console.log('DB URL:', process.env.DATABASE_URL);

  // 1. 기존 데이터 초기화 (선택 사항: 시드 돌릴 때마다 중복 생성 방지)
  await prisma.listings.deleteMany();
  await prisma.roommate_profiles.deleteMany();
  await prisma.users.deleteMany();

  // 유저 1 (룸메이트 프로필 포함)
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
      // 💡 여기에 룸메이트 프로필 정보를 추가했어!
      roommate_profiles: {
        create: {
          desired_city: 'Richardson',
          budget_min: 600,
          budget_max: 900,
          wake_up_time: new Date('1970-01-01T07:00:00Z'), // 오전 7시
          sleep_time: new Date('1970-01-01T23:00:00Z'),   // 오후 11시
          cleanliness_level: 4,
          smoking: false,
          pets_ok: false,
          preferred_roommate_gender: 'Any',
          self_intro: 'UTD 대학원생입니다. 조용하고 깔끔한 생활을 선호해요. 주말에는 카페에서 공부하거나 등산을 즐깁니다.',
          move_in_date: new Date('2026-08-01'),
        }
      }
    },
    include: { roommate_profiles: true } // 💡 방금 만든 프로필 ID를 가져오기 위해 include
  });

  // 유저 2
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
      roommate_profiles: {
        create: {
          desired_city: 'Plano',
          budget_min: 500,
          budget_max: 700,
          cleanliness_level: 5,
          smoking: false,
          pets_ok: true,
          preferred_roommate_gender: 'F',
          self_intro: '플라노 출퇴근하는 직장인입니다. 강아지 한 마리 키우고 있어요!',
        }
      }
    },
    include: { roommate_profiles: true }
  });

  // 유저 3
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

  console.log('✅ 유저 및 룸메이트 프로필 생성 완료');

  // 매물 생성 (listing_photos 같이 생성 - 네 코드 그대로!)
  await prisma.listings.create({
    data: {
      owner_id: user1.id,
      title: 'UTD 차로 5분 거리, 깨끗한 마스터 베드룸 렌트합니다',
      description: 'UTD 북쪽 조용한 주택가입니다. 화장실 단독으로 사용하시고, H마트도 차로 10분 거리에 있습니다.',
      room_type: 'Master_Bedroom',
      rent_price: 850,
      deposit: 850,
      city: 'Richardson',
      move_in_date: new Date('2026-08-01'),
      gender_preference: 'M',
      pets_allowed: false,
      parking_available: true,
      furnished: false,
      move_in_date: new Date('2025-08-01'),
      latitude: 33.1507,
      longitude: -96.8236,
      listing_photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', sort_order: 0 },
          { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', sort_order: 1 },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user2.id,
      title: '플라노 H마트 도보 5분! 여성 전용 쉐어룸',
      description: '새로 리모델링한 아파트입니다. 거실 쉐어하실 깔끔한 여성분 찾아요.',
      room_type: 'Shared',
      rent_price: 550,
      deposit: 500,
      city: 'Plano',
      address_raw: '4000 W Plano Pkwy, Plano, TX 75093',
      room_type: room_type_enum.Shared,
      rent_price: 550,
      deposit: 550,
      gender_preference: preference_gender_enum.F,
      parking_available: true,
      furnished: true,
      move_in_date: new Date('2025-08-15'),
      latitude: 33.037,
      longitude: -96.749,
      listing_photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80', sort_order: 0 },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user3.id,
      title: '프리스코 조용한 동네 개인방 (Private Room)',
      description: '직장인 환영합니다. 주차 공간 넉넉하고 짐(Gym)이랑 수영장 있는 아파트입니다.',
      room_type: 'Private',
      rent_price: 700,
      deposit: 700,
      city: 'Frisco',
      move_in_date: new Date('2026-07-10'),
      gender_preference: 'Any',
      pets_allowed: true,
      parking_available: true,
      furnished: false,
      move_in_date: new Date('2025-09-01'),
      latitude: 32.9857,
      longitude: -96.7501,
      listing_photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80', sort_order: 0 },
        ],
      },
    },
  });

  console.log('✅ 매물 3개 생성 완료');
  
  // 🔥 테스트용 URL 출력
  console.log('\n======================================');
  console.log('🎉 테스트용 상세 페이지 주소 (클릭 또는 복사하세요):');
  console.log(`http://localhost:3000/roommates/${user1.roommate_profiles[0].id}`);
  console.log(`http://localhost:3000/roommates/${user2.roommate_profiles[0].id}`);
  console.log('======================================\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
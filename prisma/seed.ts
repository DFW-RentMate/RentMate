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
  console.log('DB URL:', process.env.DATABASE_URL);

  // 💡 1. 기존 데이터 초기화 (외래 키 충돌 방지를 위해 하위 테이블부터 순서대로 삭제)
  await prisma.listing_photos.deleteMany();
  await prisma.listings.deleteMany();
  await prisma.roommate_profiles.deleteMany();
  await prisma.users.deleteMany();
  console.log('🗑️ 기존 데이터 삭제 완료');

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
    include: { roommate_profiles: true }
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
  // 유저 4 (캐롤튼 직장인 - 남성 선호)
  const user4 = await prisma.users.create({
    data: {
      email: 'minjun@example.com',
      auth_provider: 'google',
      auth_provider_id: 'google-test-004',
      name: '정민준',
      gender: 'M',
      profile_photo_url: 'https://i.pravatar.cc/150?u=user-104',
      occupation_type: '소프트웨어 엔지니어 (Carrollton)',
      is_verified: true,
      roommate_profiles: {
        create: {
          desired_city: 'Carrollton',
          budget_min: 700,
          budget_max: 1100,
          cleanliness_level: 5,
          smoking: false,
          pets_ok: false,
          preferred_roommate_gender: 'M',
          self_intro: '캐롤튼 H마트 근처 직장인입니다. 비흡연자이고 집에서는 조용히 쉬거나 게임하는 걸 좋아해요. 깔끔하신 분이면 좋겠습니다!',
        },
      },
    },
    include: { roommate_profiles: true },
  });

  // 유저 5 (어빙 대학원생 - 여성 선호)
  const user5 = await prisma.users.create({
    data: {
      email: 'sujin@example.com',
      auth_provider: 'kakao',
      auth_provider_id: 'kakao-test-005',
      name: '최수진',
      gender: 'F',
      profile_photo_url: 'https://i.pravatar.cc/150?u=user-105',
      occupation_type: '대학원생 (Irving)',
      is_verified: true,
      roommate_profiles: {
        create: {
          desired_city: 'Irving',
          budget_min: 600,
          budget_max: 850,
          cleanliness_level: 4,
          smoking: false,
          pets_ok: true,
          preferred_roommate_gender: 'F',
          self_intro: '어빙 Las Colinas 쪽 아파트 같이 구하실 여성 룸메이트 찾아요! 고양이 한 마리 키우고 있어서 동물 좋아하시는 분이면 환영합니다.',
        },
      },
    },
    include: { roommate_profiles: true },
  });

  // 유저 6 (알링턴 대학생 - 성별 무관)
  const user6 = await prisma.users.create({
    data: {
      email: 'hyunwoo@example.com',
      auth_provider: 'google',
      auth_provider_id: 'google-test-006',
      name: '강현우',
      gender: 'M',
      profile_photo_url: 'https://i.pravatar.cc/150?u=user-106',
      occupation_type: 'UTA 학부생',
      is_verified: false,
      roommate_profiles: {
        create: {
          desired_city: 'Arlington',
          budget_min: 500,
          budget_max: 750,
          cleanliness_level: 3,
          smoking: false,
          pets_ok: true,
          preferred_roommate_gender: 'Any',
          self_intro: 'UTA 근처에서 룸메이트 찾습니다! 성격 털털하고 서로 생활 패턴 존중해 주실 분이면 성별 상관없이 환영해요.',
        },
      },
    },
    include: { roommate_profiles: true },
  });

  // 유저 7 (달라스 다운타운 직장인 - 여성 선호)
  const user7 = await prisma.users.create({
    data: {
      email: 'yuna@example.com',
      auth_provider: 'google',
      auth_provider_id: 'google-test-007',
      name: '윤유나',
      gender: 'F',
      profile_photo_url: 'https://i.pravatar.cc/150?u=user-107',
      occupation_type: '그래픽 디자이너 (Dallas)',
      is_verified: true,
      roommate_profiles: {
        create: {
          desired_city: 'Dallas',
          budget_min: 900,
          budget_max: 1300,
          cleanliness_level: 5,
          smoking: false,
          pets_ok: false,
          preferred_roommate_gender: 'F',
          self_intro: '다운타운 달라스로 출퇴근합니다. 공용 공간 깨끗하게 사용하고 사생활 존중해 주실 직장인 룸메 분 원해요!',
        },
      },
    },
    include: { roommate_profiles: true },
  });

  console.log('✅ 유저 및 룸메이트 프로필 생성 완료');

  // 매물 1 생성 (중복된 move_in_date 속성 제거)
  await prisma.listings.create({
    data: {
      owner_id: user1.id,
      title: 'UTD 차로 5분 거리, 깨끗한 마스터 베드룸 렌트합니다',
      description: 'UTD 북쪽 조용한 주택가입니다. 화장실 단독으로 사용하시고, H마트도 차로 10분 거리에 있습니다.',
      room_type: room_type_enum.Master_Bedroom,
      rent_price: 850,
      deposit: 850,
      city: 'Richardson',
      move_in_date: new Date('2026-08-01'),
      gender_preference: preference_gender_enum.M,
      pets_allowed: false,
      parking_available: true,
      furnished: false,
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

  // 매물 2 생성 (중복된 room_type, rent_price, deposit 속성 제거)
  await prisma.listings.create({
    data: {
      owner_id: user2.id,
      title: '플라노 H마트 도보 5분! 여성 전용 쉐어룸',
      description: '새로 리모델링한 아파트입니다. 거실 쉐어하실 깔끔한 여성분 찾아요.',
      room_type: room_type_enum.Shared,
      rent_price: 550,
      deposit: 550,
      city: 'Plano',
      address_raw: '4000 W Plano Pkwy, Plano, TX 75093',
      gender_preference: preference_gender_enum.F,
      parking_available: true,
      furnished: true,
      move_in_date: new Date('2026-08-15'),
      latitude: 33.037,
      longitude: -96.749,
      listing_photos: {
        create: [
          { url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80', sort_order: 0 },
        ],
      },
    },
  });

  // 매물 3 생성 (중복된 move_in_date 속성 제거)
  await prisma.listings.create({
    data: {
      owner_id: user3.id,
      title: '프리스코 조용한 동네 개인방 (Private Room)',
      description: '직장인 환영합니다. 주차 공간 넉넉하고 짐(Gym)이랑 수영장 있는 아파트입니다.',
      room_type: room_type_enum.Private,
      rent_price: 700,
      deposit: 700,
      city: 'Frisco',
      move_in_date: new Date('2026-07-10'),
      gender_preference: preference_gender_enum.Any,
      pets_allowed: true,
      parking_available: true,
      furnished: false,
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
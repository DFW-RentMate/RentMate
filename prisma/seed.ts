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

  await prisma.listings.create({
    data: {
      owner_id: user1.id,
      title: '프리스코 조용한 동네 개인방 (Private Room)',
      description:
        '조용한 주택가 위치. 화장실 공유, 주방 사용 가능. 한인 많은 동네.',
      city: 'Frisco',
      address_raw: '123 Eldorado Pkwy, Frisco, TX 75034',
      room_type: room_type_enum.Private,
      rent_price: 700,
      deposit: 700,
      gender_preference: preference_gender_enum.Any,
      parking_available: true,
      furnished: false,
      move_in_date: new Date('2025-08-01'),
      latitude: 33.1507,
      longitude: -96.8236,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
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
        'H마트, 한인 식당 도보권. 여성 룸메이트 구합니다. 깔끔하고 안전한 동네.',
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
          {
            url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user3.id,
      title: 'UTD 차로 5분 거리, 깨끗한 마스터 베드룸',
      description: 'UTD 통학 최적. 마스터룸 + 개인 화장실. 주차 2대 가능.',
      city: 'Richardson',
      address_raw: '900 E Campbell Rd, Richardson, TX 75081',
      room_type: room_type_enum.Master_Bedroom,
      rent_price: 850,
      deposit: 850,
      gender_preference: preference_gender_enum.Any,
      parking_available: true,
      furnished: false,
      move_in_date: new Date('2025-09-01'),
      latitude: 32.9857,
      longitude: -96.7501,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user1.id,
      title: '앨런 신축 아파트 개인실, 빌딩 내 헬스장',
      description: '2023년 신축. 풀 퍼니시드. 헬스장, 수영장 공용 사용 가능.',
      city: 'Allen',
      address_raw: '190 E Stacy Rd, Allen, TX 75002',
      room_type: room_type_enum.Private,
      rent_price: 750,
      deposit: 750,
      gender_preference: preference_gender_enum.Any,
      parking_available: true,
      furnished: true,
      move_in_date: new Date('2025-08-01'),
      latitude: 33.1032,
      longitude: -96.6706,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user2.id,
      title: '맥킨니 조용한 타운홈 쉐어룸 - 남성 선호',
      description: '타운홈 2층 방. 집 전체 넓고 깔끔. 고양이 1마리 있음.',
      city: 'McKinney',
      address_raw: '2551 W University Dr, McKinney, TX 75071',
      room_type: room_type_enum.Shared,
      rent_price: 500,
      deposit: 500,
      gender_preference: preference_gender_enum.M,
      parking_available: true,
      furnished: false,
      move_in_date: new Date('2025-09-01'),
      latitude: 33.1972,
      longitude: -96.6397,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user3.id,
      title: '캐럴턴 갤러리아 근처 마스터룸, 한인타운 5분',
      description: '갤러리아몰 차로 5분. 한인마트 근접. 개인 욕실 포함.',
      city: 'Carrollton',
      address_raw: '2925 E Trinity Mills Rd, Carrollton, TX 75006',
      room_type: room_type_enum.Master_Bedroom,
      rent_price: 900,
      deposit: 900,
      gender_preference: preference_gender_enum.Any,
      parking_available: true,
      furnished: true,
      move_in_date: new Date('2025-08-01'),
      latitude: 32.9537,
      longitude: -96.8903,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user1.id,
      title: '어빙 DFW공항 10분, 깨끗한 개인실',
      description: '공항 출퇴근 직장인 추천. 조용한 하우스. 주차 무료.',
      city: 'Irving',
      address_raw: '3011 W Airport Fwy, Irving, TX 75062',
      room_type: room_type_enum.Private,
      rent_price: 650,
      deposit: 650,
      gender_preference: preference_gender_enum.Any,
      parking_available: true,
      furnished: false,
      move_in_date: new Date('2025-08-15'),
      latitude: 32.814,
      longitude: -96.9489,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user2.id,
      title: '달라스 업타운 쉐어룸 - 대중교통 최적',
      description:
        '업타운 도보권. DART 역 3분. 젊고 활기찬 동네. 한인 룸메이트 환영.',
      city: 'Dallas',
      address_raw: '2500 McKinney Ave, Dallas, TX 75201',
      room_type: room_type_enum.Shared,
      rent_price: 750,
      deposit: 750,
      gender_preference: preference_gender_enum.Any,
      parking_available: false,
      furnished: true,
      move_in_date: new Date('2025-08-01'),
      latitude: 32.7984,
      longitude: -96.8021,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user3.id,
      title: '애디슨 레스토랑 거리 도보권, 넓은 마스터룸',
      description:
        '애디슨 서클 도보 5분. 맛집 많은 동네. 넓은 방 + 워크인 클로짓.',
      city: 'Addison',
      address_raw: '14866 Montfort Dr, Addison, TX 75001',
      room_type: room_type_enum.Master_Bedroom,
      rent_price: 950,
      deposit: 950,
      gender_preference: preference_gender_enum.Any,
      parking_available: true,
      furnished: false,
      move_in_date: new Date('2025-09-15'),
      latitude: 32.9612,
      longitude: -96.8322,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
          },
        ],
      },
    },
  });

  await prisma.listings.create({
    data: {
      owner_id: user1.id,
      title: '플라노 Legacy 지역 개인실 - 삼성전자 근처',
      description: '삼성전자 본사 차 5분. 직장인 한인분 선호. 넓은 거실 공유.',
      city: 'Plano',
      address_raw: '7001 Legacy Dr, Plano, TX 75024',
      room_type: room_type_enum.Private,
      rent_price: 780,
      deposit: 780,
      gender_preference: preference_gender_enum.Any,
      parking_available: true,
      furnished: true,
      move_in_date: new Date('2025-08-01'),
      latitude: 33.0748,
      longitude: -96.8237,
      listing_photos: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800',
          },
        ],
      },
    },
  });

  console.log('✅ 매물 10개 생성');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

// src/mocks/data.ts

// 1. 유저 가짜 데이터 (작성자 프로필 등에 사용)
export const mockUsers = [
  {
    id: "user-101",
    name: "김철수",
    email: "chulsoo@example.com",
    profile_photo_url: "https://i.pravatar.cc/150?u=user-101",
    gender: "M",
    occupation_type: "UTD 대학원생",
    is_verified: true,
  },
  {
    id: "user-102",
    name: "이영희",
    email: "younghee@example.com",
    profile_photo_url: "https://i.pravatar.cc/150?u=user-102",
    gender: "F",
    occupation_type: "직장인 (Plano)",
    is_verified: true,
  },
  {
    id: "user-103",
    name: "박지민",
    email: "jimin@example.com",
    profile_photo_url: "https://i.pravatar.cc/150?u=user-103",
    gender: "F",
    occupation_type: "UTD 학부생",
    is_verified: false,
  }
];

// 2. 매물(Listing) 가짜 데이터 (메인 홈, 검색 페이지의 매물 카드용)
export const mockListings = [
  {
    id: "listing-001",
    owner: mockUsers[0], // 김철수가 올린 방
    title: "UTD 차로 5분 거리, 깨끗한 마스터 베드룸 렌트합니다",
    description: "UTD 북쪽 조용한 주택가입니다. 화장실 단독으로 사용하시고, H마트도 차로 10분 거리에 있습니다.",
    room_type: "Master Bedroom",
    rent_price: 850.00,
    deposit: 850.00,
    city: "Richardson",
    move_in_date: "2026-08-01",
    gender_preference: "M",
    pets_allowed: false,
    parking_available: true,
    furnished: true,
    utilities_included: true, // 프론트 UI 편의를 위해 통합된 필드 (전기,수도 등)
    status: "active",
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    created_at: "2026-07-02T10:00:00Z",
  },
  {
    id: "listing-002",
    owner: mockUsers[1],
    title: "플라노 H마트 도보 5분! 여성 전용 쉐어룸",
    description: "새로 리모델링한 아파트입니다. 거실 쉐어하실 깔끔한 여성분 찾아요. 세탁기, 건조기 집 안에 있습니다.",
    room_type: "Shared",
    rent_price: 550.00,
    deposit: 500.00,
    city: "Plano",
    move_in_date: "2026-07-15",
    gender_preference: "F",
    pets_allowed: false,
    parking_available: false,
    furnished: true,
    utilities_included: false,
    status: "active",
    photos: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"
    ],
    created_at: "2026-07-03T14:30:00Z",
  },
  {
    id: "listing-003",
    owner: mockUsers[2],
    title: "프리스코 조용한 동네 개인방 (Private Room)",
    description: "직장인 환영합니다. 주차 공간 넉넉하고 짐(Gym)이랑 수영장 있는 아파트입니다.",
    room_type: "Private",
    rent_price: 700.00,
    deposit: 700.00,
    city: "Frisco",
    move_in_date: "2026-07-10",
    gender_preference: "Any",
    pets_allowed: true,
    parking_available: true,
    furnished: false,
    utilities_included: true,
    status: "active",
    photos: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80"
    ],
    created_at: "2026-07-04T09:15:00Z",
  }
];

// 3. 룸메이트 프로필 가짜 데이터 (룸메이트 찾기 페이지의 프로필 카드용)
export const mockRoommateProfiles = [
  {
    id: "profile-001",
    user: mockUsers[1], // 이영희의 프로필
    desired_city: "Plano",
    budget_min: 500,
    budget_max: 700,
    wake_up_time: "07:00",
    sleep_time: "23:30",
    cleanliness_level: 5, // 1~5점
    smoking: false,
    pets_ok: true,
    preferred_roommate_gender: "F",
    self_intro: "안녕하세요! 플라노에서 직장 다니고 있는 20대 후반입니다. 평일에는 일찍 자고 일찍 일어나는 편이고, 공용 공간은 깨끗하게 유지하는 걸 중요하게 생각해요. 강아지나 고양이 좋아합니다!",
    move_in_date: "2026-07-15",
  },
  {
    id: "profile-002",
    user: mockUsers[2], // 박지민의 프로필
    desired_city: "Richardson",
    budget_min: 600,
    budget_max: 900,
    wake_up_time: "09:00",
    sleep_time: "02:00",
    cleanliness_level: 3,
    smoking: false,
    pets_ok: false,
    preferred_roommate_gender: "F",
    self_intro: "UTD 다니는 학생입니다! 시험 기간에는 주로 도서관에 있어서 집에 잘 없고, 밤에 늦게 자는 편이지만 조용히 지냅니다. 같이 가끔 밥도 먹고 친하게 지낼 룸메이트 구해요~",
    move_in_date: "2026-08-01",
  }
];
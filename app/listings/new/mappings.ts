/**
 * 위저드 전용: 한글 표시값 ↔ DB enum 변환
 
 */

export const ROOM_TYPES_KO = ['개인실', '셰어', '스튜디오', '마스터룸'] as const;
export type RoomTypeKo = (typeof ROOM_TYPES_KO)[number];

export const GENDER_PREFS_KO = ['무관', '남성', '여성'] as const;
export type GenderPrefKo = (typeof GENDER_PREFS_KO)[number];

// 한글 → DB enum (제출 시에만 사용)
export const ROOM_TYPE_TO_DB: Record<RoomTypeKo, string> = {
  개인실: 'Private',
  셰어: 'Shared',
  스튜디오: 'Studio',
  마스터룸: 'Master_Bedroom',
};

export const GENDER_TO_DB: Record<GenderPrefKo, string> = {
  무관: 'Any',
  남성: 'M',
  여성: 'F',
};

// 영문 라벨 병기용 (화면 표시)
export const ROOM_TYPE_LABEL_EN: Record<RoomTypeKo, string> = {
  개인실: 'Private',
  셰어: 'Shared',
  스튜디오: 'Studio',
  마스터룸: 'Master',
};

export const GENDER_LABEL_EN: Record<GenderPrefKo, string> = {
  무관: 'Any',
  남성: 'Male',
  여성: 'Female',
};

export const CITIES = ['Richardson', 'Plano', 'Allen', 'Frisco', 'Carrollton'] as const;
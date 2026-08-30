/**
 * 위저드 전용: 한글 표시값 ↔ DB enum 변환
 * 팀 컨벤션(한글 값)을 유지하면서 DB 저장 직전에만 영문으로 변환
 */

export const ROOM_TYPES_KO = [
  '개인실',
  '셰어',
  '스튜디오',
  '마스터룸',
] as const;
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

export const DB_TO_ROOM_TYPE: Record<string, RoomTypeKo> = {
  Private: '개인실',
  Shared: '셰어',
  Studio: '스튜디오',
  Master_Bedroom: '마스터룸',
};

export const DB_TO_GENDER: Record<string, GenderPrefKo> = {
  M: '남성',
  F: '여성',
  Any: '무관',
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

// 도시 목록 (검색 필터와 동일하게 유지)
export const CITIES = [
  'Richardson',
  'Plano',
  'Allen',
  'Frisco',
  'Carrollton',
  'Dallas',
  'Irving',
  'Garland',
  'McKinney',
  'Denton',
  'Lewisville',
  'Coppell',
  'Addison',
  'Arlington',
  'Grapevine',
  'Flower Mound',
] as const;

// 주변 편의시설 (한인 특화 랜드마크 포함)
export const NEARBY_FACILITIES = [
  'H마트',
  '한인마트',
  '한인타운',
  'UTD 캠퍼스',
  '대중교통(DART)',
  '마트(Kroger 등)',
  '헬스장',
  '공원',
  '세탁소',
  '한인교회',
] as const;

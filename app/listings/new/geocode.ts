/**
 * 클라이언트에서 /api/geocode를 호출 헬퍼.
 * 주소 문자열을 받아 { lat, lng } 반환 (실패 시 null).
 */
export async function geocodeAddress(
  fullAddress: string,
): Promise<{ lat: number | null; lng: number | null }> {
  try {
    const res = await fetch(
      `/api/geocode?address=${encodeURIComponent(fullAddress)}`,
    );
    if (!res.ok) return { lat: null, lng: null };
    return await res.json();
  } catch {
    return { lat: null, lng: null };
  }
}
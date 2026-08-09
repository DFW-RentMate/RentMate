import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: '주소가 필요합니다.' }, { status: 400 });
  }

  try {
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('q', address);
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', '1');
    url.searchParams.set('countrycodes', 'us'); // 미국으로 한정 → 정확도 향상

    const res = await fetch(url.toString(), {
      headers: {
        // 앱 식별 user agent
        'User-Agent': 'RoomRentDFW/1.0 (contact@roomrentdfw.com)',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: '지오코딩 실패' }, { status: 502 });
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      // 좌표를 못 찾음 → null 반환 (등록은 계속 가능하게)
      return NextResponse.json({ lat: null, lng: null });
    }

    return NextResponse.json({
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    });
  } catch {
    return NextResponse.json({ lat: null, lng: null });
  }
}
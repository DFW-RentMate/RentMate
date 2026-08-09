import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { createClient } from "@supabase/supabase-js";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// .env에 있는 Supabase URL과 Key를 사용
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
// Service Role Key 또는 Anon Key 사용 (가급적 SUPABASE_SERVICE_ROLE_KEY)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);


export async function POST(request: Request) {
  // ── 로그인 확인 ──
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "업로드할 파일이 없습니다." }, { status: 400 });
    }

    // 파일 이름 확장자 추출 및 고유 파일명 생성 (예: 1712345678_profile.png)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `listings/${fileName}`;

    // ArrayBuffer를 Buffer로 변환하여 Supabase Storage에 업로드
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("profile-photos") // 기존에 만든 버킷 이름
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("upload error:", error);
      return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
    }

    // 업로드된 파일의 public URL 가져오기
    const { data: publicUrlData } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("upload error:", error);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}
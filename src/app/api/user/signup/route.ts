import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  await fetch(process.env.BACKEND_API_URL + '/member/join', {
    method: 'POST',
    body: JSON.stringify({
      id: -1,
      name: data.nickname,
      phoneNo: data.phoneNo,
      email: data.email,
      method: 'kakao',
    }),
  });

  return NextResponse.json({});
}

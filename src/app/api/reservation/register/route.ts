import { NextRequest, NextResponse } from 'next/server';
import { doPOST, FetchError } from '@/backend/service';
import { getAccessTokenFromCookie } from '@/utils/token';

type RequestBody = {
  token: string;
  name: string;
  phoneNo: string;
  vendor: string;
  model: string;
  carNo: string;
  note: string;
};

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  const accessToken = await getAccessTokenFromCookie();
  if (!accessToken) {
    return NextResponse.json({ success: false, message: '인증 실패' });
  }

  try {
    const result = await doPOST('/reservation', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idempotencyKey: body.token,
        contents: body.note,
        clientName: body.name,
        phoneNo: body.phoneNo,
        car: {
          make: body.vendor,
          model: body.model,
          licensePlate: body.carNo,
        },
      }),
    });

    if (result.code === 'NORMAL') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: `${result.message} [${result.code}]` });
    }
  } catch (e) {
    console.warn(e);
    const cause = e instanceof FetchError ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : String(e);
    return NextResponse.json({ success: false, message: `서버와 연결에 실패하였습니다. [${cause}]` });
  }
}

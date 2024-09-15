import { NextRequest, NextResponse } from 'next/server';
import { deleteUserTokenForCookie } from '@/utils/token';

export async function POST(request: NextRequest) {
  deleteUserTokenForCookie();
  return NextResponse.json({});
}

import 'server-only';
import { NextRequest } from 'next/server';

export const getRequestHost = (request: NextRequest) => {
  if (request.headers.has('host')) {
    return request.nextUrl.protocol + '//' + request.headers.get('host');
  }
  return request.url;
};

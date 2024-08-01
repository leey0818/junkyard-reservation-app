import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(process.env.BACKEND_API_URL + '/token/kakao', () => {
    return HttpResponse.json({
      clientId: process.env.MOCK_KAKAO_CLIENT_ID,
      redirectUri: process.env.MOCK_KAKAO_REDIRECT_URI,
    });
  }),
];

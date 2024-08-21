export type ApiResponse<D = {}> = {
  code: string;
  message: string;
  data: D;
}

/* 회원가입용 토큰 페이로드 */
export type SignupTokenPayload = {
  id: string;
  name: string;
  profile: string | null;
};

export type ApiResponse<D = {}> = {
  code: string;
  message: string;
  data: D;
}

/* 회원가입용 토큰 페이로드 */
export type SignupTokenPayload = {
  id: number;
  name: string;
  profile: string | null;
};

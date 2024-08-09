export type ApiResponse<D = {}> = {
  code: string;
  message: string;
  data: D;
}

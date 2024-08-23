export type ApiResponse<D = {}> = {
  code: string;
  message: string;
  data: D;
};

export class FetchError extends Error {
  readonly status = this.response.status;
  readonly statusText = this.response.statusText;

  constructor(readonly response: Response) {
    super(`${response.status} ${response.statusText}`);
  }
}

/**
 * 백앤드 API 호출
 * @param uri API URI
 * @param options fetch 옵션
 */
export const doCallAPI = async <D = never>(uri: string, options: RequestInit): Promise<ApiResponse<D>> => {
  const res = await fetch(process.env.BACKEND_API_URL + uri, {
    ...options,
    cache: 'no-store',
  });

  console.log(`Backend API Call: ${uri} ${res.status} ${res.statusText}`);

  if (res.ok) return await res.json();
  throw new FetchError(res);
};

// aliasing call method
export const doGET  = <D = never>(uri: string, options: RequestInit)=> doCallAPI<D>(uri, { ...options, method: 'GET' });
export const doPOST = <D = never>(uri: string, options: RequestInit)=> doCallAPI<D>(uri, { ...options, method: 'POST' });

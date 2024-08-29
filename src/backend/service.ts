export type ApiResponse<D = {}> = {
  code: string;
  message: string;
  data: D;
};

export class FetchError extends Error {
  readonly status = this.response.status;
  readonly statusText = this.response.statusText;

  constructor(readonly request: Request, readonly response: Response) {
    super(`${response.status} ${response.statusText}`);
  }
}

/**
 * 백앤드 API 호출
 * @param uri API URI
 * @param options fetch 옵션
 */
export const doCallAPI = async <D = never>(uri: string, options: RequestInit): Promise<ApiResponse<D>> => {
  const req = new Request(process.env.BACKEND_API_URL + uri, {
    ...options,
    cache: 'no-store',
  });

  const res = await fetch(req);

  console.log(`Backend API Call: ${uri} ${res.status} ${res.statusText}`);

  if (res.ok || res.status === 500) return await res.json();
  throw new FetchError(req, res);
};

// aliasing call method
export const doGET  = <D = never>(uri: string, options: RequestInit)=> doCallAPI<D>(uri, { ...options, method: 'GET' });
export const doPOST = <D = never>(uri: string, options: RequestInit)=> doCallAPI<D>(uri, { ...options, method: 'POST' });

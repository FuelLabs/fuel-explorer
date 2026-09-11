type Options = {
  cache?: RequestCache;
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);

  if (res.ok) {
    return res.json();
  }

  if (res.status === 429) {
    // nginx answers rate-limited requests with an HTML body, so res.json()
    // would throw a SyntaxError instead of surfacing the real 429 status.
    throw new ApiError(429, 'Too many requests, please slow down');
  }

  const body = await res.text();
  let message = res.statusText;
  try {
    message = JSON.parse(body).message ?? message;
  } catch {
    // non-JSON error body (e.g. an nginx/proxy HTML page) falls back to statusText
  }
  throw new ApiError(res.status, message);
};

export const api = {
  get: request,
  post: async <TData, TBody>(url: string, body: TBody, options?: Options) => {
    return request<TData>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: options?.cache,
      body: JSON.stringify(body),
    });
  },
};

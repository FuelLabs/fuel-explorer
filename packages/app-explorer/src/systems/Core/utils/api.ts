type Options = {
  cache?: RequestCache;
};

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);

  if (res.ok) {
    return res.json();
  }

  const error = await res.json();
  return Promise.reject(error);
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

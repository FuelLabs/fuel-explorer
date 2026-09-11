import { ApiError, api } from './api';

describe('api', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('throws a generic "Too many requests" ApiError for a 429 with an HTML body', async () => {
    // nginx answers rate-limited requests with an HTML body, not JSON, so
    // the error path must not assume res.json() succeeds.
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
      text: async () => '<html><body>429 Too Many Requests</body></html>',
    } as Response);

    await expect(api.get('/some/url')).rejects.toMatchObject({
      status: 429,
      message: 'Too many requests, please slow down',
    });
    await expect(api.get('/some/url')).rejects.toBeInstanceOf(ApiError);
  });

  it('throws an ApiError using the parsed message for a JSON error body', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: async () => JSON.stringify({ message: 'boom' }),
    } as Response);

    await expect(api.get('/some/url')).rejects.toMatchObject({
      status: 500,
      message: 'boom',
    });
  });

  it('falls back to the status text when a non-429 error body is not JSON', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 502,
      statusText: 'Bad Gateway',
      text: async () => '<html>Bad Gateway</html>',
    } as Response);

    await expect(api.get('/some/url')).rejects.toMatchObject({
      status: 502,
      message: 'Bad Gateway',
    });
  });
});

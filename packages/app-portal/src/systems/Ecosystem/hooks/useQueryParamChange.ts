import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function useQueryParamChange() {
  const [searchParams, setSearchParams] = useSearchParams();
  const _navigate = useNavigate();

  return useCallback(
    (name: 'tag' | 'search' | 'liveOnly', value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      // Update URL without navigation to prevent page reload
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams],
  );
}

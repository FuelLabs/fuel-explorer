'use client';

import { useRef, useState, useTransition } from 'react';
import type z from 'zod';

import type { Action } from './act-server';

type UseActOpts<Response> = {
  onSuccess?: (res: Response) => void;
  onError?: (err: Error) => void;
  initialLoading?: boolean;
};

export function useAct<InputType extends z.ZodTypeAny, Response>(
  action: Action<InputType, Response>,
  opts: UseActOpts<Response> = {},
) {
  const doAction = useRef(action);
  const [data, setData] = useState<Response | null>(null);
  const [isLoading, setLoading] = useState(() => opts.initialLoading);
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState<Error | null>(null);

  function mutate(input: z.infer<InputType>) {
    startTransition(async () => {
      setLoading(true);
      try {
        const res = await doAction.current(input);
        setData(res);
        setErr(null);
        opts.onSuccess?.(res);
      } catch (error) {
        console.log(error);
        setErr(error as Error);
        setData(null);
        opts.onError?.(error as Error);
      }
    });
    setLoading(false);
  }

  return {
    mutate,
    data,
    isLoading: isLoading || isPending,
    error: err,
  };
}

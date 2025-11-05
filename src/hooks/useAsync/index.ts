import { useCallback, useEffect, useRef, useState } from "react";

type AsyncState<T> = {
  loading: boolean;
  error: unknown;
  value: T | null;
};

export function useAsync<T>(
  fn: () => Promise<T>,
  deps: any[] = [],
  immediate: boolean = true
) {
  const isMounted = useRef(true);
  const [state, setState] = useState<AsyncState<T>>({
    loading: immediate,
    error: null,
    value: null,
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const execute = useCallback(async () => {
    setState({ loading: true, error: null, value: null });
    try {
      const value = await fn();
      if (isMounted.current) setState({ loading: false, error: null, value });
      return value;
    } catch (error) {
      if (isMounted.current) setState({ loading: false, error, value: null });
      throw error;
    }
  }, deps);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { ...state, execute };
}

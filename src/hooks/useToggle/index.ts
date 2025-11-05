import { useCallback, useState } from 'react';

export function useToggle(initial = false) {
  const [on, setOn] = useState<boolean>(initial);
  const toggle = useCallback((value?: boolean) => {
    setOn(prev => (typeof value === 'boolean' ? value : !prev));
  }, []);
  return { on, toggle, setOn };
}

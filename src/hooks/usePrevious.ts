import { useRef, useEffect } from 'react';

export default function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T>();

  useEffect(() => {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }, [value]);

  return previousRef.current;
}

import { useEffect, useState } from 'react';

export default function useActiveElement(): Element | null {
  const [active, setActive] = useState(document.activeElement);

  const handleFocusIn = () => setActive(document.activeElement);

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  return active;
}

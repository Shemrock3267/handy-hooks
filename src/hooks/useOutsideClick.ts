import { RefObject, useEffect } from 'react';
import { TEventListener } from '../types';

/**
 * Custom hook to detect clicks outside of a specified ref
 * @param ref Ref object for an element
 * @param callback Function to be called on outside click
 */

export default function useOutSideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
): void {
  const handleClick: TEventListener = (e) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
}

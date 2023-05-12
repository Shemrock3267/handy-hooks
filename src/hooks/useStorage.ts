import { useCallback, useState, useEffect } from 'react';
import { TStorageObject, TUseStorageReturn } from '../types';

function useStorage<T>(
  key: string,
  defaultValue: () => T | T,
  storageObject: TStorageObject
): TUseStorageReturn<T> {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined as T);
  }, []);

  return [value, setValue, remove];
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: () => T | T
): TUseStorageReturn<T> {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(
  key: string,
  defaultValue: () => T | T
): TUseStorageReturn<T> {
  return useStorage(key, defaultValue, window.sessionStorage);
}

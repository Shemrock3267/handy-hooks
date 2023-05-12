export interface IUseAsyncState {
  loading: boolean;
  error: Error | null;
  value: unknown;
}

export interface IWindowSize {
  width: number;
  height: number;
}

export type TUseAsyncAction =
  | { type: 'start' }
  | { type: 'finish'; value: unknown }
  | { type: 'error'; error: Error | string };

export type TEventListener = (event: Event) => void;

export type TStorageObject = Pick<
  Storage,
  'getItem' | 'setItem' | 'removeItem'
>;

export type TSetValue<T> = (value: T | ((prevValue: T) => T)) => void;

export type TRemoveValue = () => void;

export type TUseStorageReturn<T> = [T, TSetValue<T>, TRemoveValue];

export type TTimeoutReturn = {
  reset: () => void;
  clear: () => void;
};

export type TUseToggleReturn = [boolean, (value?: boolean) => void];

export type TUseWindowSize = () => IWindowSize;

import { useReducer } from 'react';

type InitialValue<T> = () => T | T;

export default function useStateHistory<T>(initialValue: InitialValue<T>) {
  const [allStates, setState] = useReducer(
    (oldState: T[], newState: T) => {
      return [...oldState, newState];
    },
    typeof initialValue === 'function'
      ? [initialValue()]
      : initialValue !== undefined
      ? [initialValue]
      : []
  );

  const currentState = allStates[allStates.length - 1];
  const stateHistory = allStates.slice(0, allStates.length - 1);
  return [currentState, setState, stateHistory];
}

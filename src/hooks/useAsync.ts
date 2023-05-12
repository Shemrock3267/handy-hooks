import { useReducer } from 'react';
import { IUseAsyncState, TUseAsyncAction } from '../types';

function stateReducer(
  state: IUseAsyncState,
  action: TUseAsyncAction
): IUseAsyncState {
  switch (action.type) {
    case 'start':
      return { loading: true, error: null, value: null };
    case 'finish':
      return { loading: false, error: null, value: action.value };
    case 'error':
      return { loading: false, error: action.error as Error, value: null };
    default:
      return state;
  }
}

const initialState: IUseAsyncState = {
  loading: false,
  error: null,
  value: null,
};

export default function useAsync<T>(fn: (args?: unknown) => Promise<T>) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const run = async (args?: unknown) => {
    try {
      dispatch({ type: 'start' });
      const value = await fn(args);
      dispatch({ type: 'finish', value });
    } catch (error) {
      if (error instanceof Error) return dispatch({ type: 'error', error });
      dispatch({ type: 'error', error: 'Unknown error' });
    }
  };

  return { ...state, run };
}

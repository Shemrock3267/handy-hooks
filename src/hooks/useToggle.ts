import { useState } from 'react';
import { TUseToggleReturn } from '../types';

export default function useToggle(defaultValue: boolean): TUseToggleReturn {
  const [value, setValue] = useState<boolean>(defaultValue);

  function toggleValue(value?: boolean) {
    setValue((currentValue) =>
      typeof value === 'boolean' ? value : !currentValue
    );
  }

  return [value, toggleValue];
}

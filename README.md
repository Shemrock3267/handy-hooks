# handy-hooks

Lib that exports bunch of usefull hooks for everyday usage in React projects.

## Hooks

### **useActiveElement**

> useActiveElement(): Element | null

The useActiveElement hook sets up an event listener on the document to track changes to the **active** element.
Whenever the focusin event fires, the handleFocusIn function is called to update the active state with the new **active** element.

Usage:

```typescript
import { useEffect, useState } from 'react';
import { useActiveElement } from '@dev_shoom/handy-hooks';

const FocusTracker = () => {
  const activeElement = useActiveElement();

  useEffect(() => {
    console.log(`The active element is: ${activeElement?.tagName}`);
  }, [activeElement]);

  return <div>Current active element: {activeElement?.tagName}</div>;
};
```

### **useAsync**

> useAsync(args?: unknown): Promise

It takes a single argument, **fn**, which is a function that returns a promise.
When useAsync is called, it returns an object containing the current **state** of the async operation and a **run** function that can be called to start the async operation.

Usage:

```typescript
import { useState } from 'react';
import { useAsync } from '@dev_shoom/handy-hooks';
import { IData } from '../types';

// The API endpoint URL
const API_URL = 'https://api.example.com/data';

// A function that fetches data from the API
const fetchData = async (): Promise<IData> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

// The component that uses the useAsync hook to fetch data
const MyComponent = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const { loading, error, value: data, run } = useAsync(fetchData);

  const handleRefresh = () => {
    // Increment the refresh count to trigger a re-fetch
    setRefreshCount((count) => count + 1);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Data: {data}</p>}
      <button onClick={() => run(refreshCount)}>Refresh</button>
    </div>
  );
};
```

### **useDebounce**

> useDebounce(value: T, delay: number): T

The useDebounce function can be used when you want to delay the execution of a function or the rendering of a component until some **time** has elapsed since the last update to a **value**.

Usage:

```typescript
import { useState } from 'react';
import { useDebounce } from '@dev_shoom/handy-hooks';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = async () => {
    // Perform a search based on the current search term
    // This could be an API call or any other async operation
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <p>Search term: {searchTerm}</p>
      <p>Debounced search term: {debouncedSearchTerm}</p>
    </div>
  );
};
```

### **useOutsideClick**

> useOutsideClick( ref: RefObject<T>, callback: () => void): void

The hook takes two arguments: **ref**, which is a RefObject for the element you want to detect clicks outside of, and **callback**, which is a function to be called when a click is detected outside of the element.

Usage:

```typescript
import { useRef } from 'react';
import { useOutSideClick } from '@dev_shoom/handy-hooks';

const Modal = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutSideClick(ref, onClose);

  return (
    <div ref={ref}>
      <p>Modal content goes here</p>
      <button onClick={onClose}>Close modal</button>
    </div>
  );
};
```

### **usePrevious**

> usePrevious(value: T): T | undefined

This hook is used to keep track of the previous value of a variable in a functional component in React.
It returns the **previous value** of the variable passed as a parameter to the hook, using the useRef hook to store the previous value.

Usage:

```typescript
import React, { useState } from 'react';
import { usePrevious } from '@dev_shoom/handy-hooks';

function UserName() {
  const [firstName, setFirstName] = useState('');
  const previousFirstName = usePrevious(firstName);

  const handleChange = (event) => {
    setFirstName(event.target.value);
  };

  return (
    <div>
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" value={firstName} onChange={handleChange} />
      {firstName && previousFirstName !== firstName && (
        <p>First name has been updated to {firstName}.</p>
      )}
    </div>
  );
}
```

### **useStateWithHistory**

> useStateWithHistory(initialValue: () => T | T): (T | T[] | React.Dispatch<T>)[]

This hook, useStateHistory, is used to maintain a history of all previous states of a state variable in a React component.
The hook returns an array with three elements: **the current state**, a **setState function** that behaves the same way as useState's setState function, and an **array of previous states**.

Usage:

```typescript
import { useStateHistory } from '@dev_shoom/handy-hooks';

function Counter() {
  const [count, setCount, countHistory] = useStateHistory(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <h2>Count history:</h2>
      <ul>
        {countHistory.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
```

### **useStorage**

> useStorage(
> key: string,
> defaultValue: () => T | T,
> storageObject: TStorageObject
> ): TUseStorageReturn<T>

The useStorage hook is a custom hook that can be used to handle storing and retrieving data from either **localStorage** or **sessionStorage**.

Usage:

```javascript
import { useLocalStorage } from '@dev_shoom/handy-hooks';

function Name() {
  const [name, setName] = useLocalStorage('name', 'John Doe');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleNameChange} />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

### **useTimeout**

> useTimeout(
> callback: () => void,
> delay: number
> ): TTimeoutReturn

The useTimeout hook is a custom React hook that provides an easy way to manage setTimeouts in a functional component.
It takes in a **callback** function and a **delay** as arguments, and returns an object with two methods: **reset** and **clear**.

Usage:

```typescript
import { useState } from 'react';
import { useTimeout } from '@dev_shoom/handy-hooks';

export default function ExampleComponent() {
  const [count, setCount] = useState(0);
  const { reset, clear } = useTimeout(() => {
    setCount(count + 1);
  }, 1000);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={reset}>Reset</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
}
```

### **useToggle**

> useToggle(defaultValue: boolean): TUseToggleReturn

This custom hook returns a tuple with two elements: the **current state value**, and a **function to toggle the state value** between true and false.

Usage:

```typescript
import { useState } from 'react';
import { useToggle } from '@dev_shoom/handy-hooks';

function MyComponent() {
  const [showText, toggleShowText] = useToggle(false);

  return (
    <div>
      <button onClick={toggleShowText}>Toggle text</button>
      {showText && <p>This text is shown when showText is true.</p>}
    </div>
  );
}
```

### **useWindowSize**

> useWindowSize(): IWindowSize

This hook, useWindowSize, allows you to get the **current window size** and track changes to it.

Usage:

```typescript
import { useWindowSize } from '@dev_shoom/handy-hooks';

function MyComponent() {
  const windowSize = useWindowSize();

  return (
    <div>
      Current window width: {windowSize.width}px
      <br />
      Current window height: {windowSize.height}px
    </div>
  );
}
```

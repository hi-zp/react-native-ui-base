import {
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from 'react';

/**
 * setState that is safe to call after component unmounts.
 * @param initialState - initial state or function that returns initial state
 * @returns [state, safedSetState]
 * @example
 * function MyComponent() {
 * const [state, setState] = useSafeState(0);
 * return <button onClick={() => setState(state + 1)}>Increment</button>;
 * }
 */
export default function useSafeState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);

  const safeRef = useRef<boolean>(true);

  const safed = (newState: S | (() => S)) => {
    if (!safeRef.current) return; // stop set
    return setState(newState);
  };

  useEffect(
    () => () => {
      safeRef.current = false;
    },
    []
  );

  // @ts-ignore
  return [state, safed];
}

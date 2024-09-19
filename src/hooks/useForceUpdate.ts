import { useCallback } from 'react';
import useSafeState from './useSafeState';

/**
 * Returns a function that can be called to force a re-render.
 * This is useful when you need to force a re-render but don't have access to the component's state.
 * @returns A function that can be called to force a re-render.
 * @example
 * function MyComponent() {
 *  const update = useUpdate();
 * return <button onClick={update}>Update</button>;
 * }
 */
export default function useForceUpdate() {
  const [, setState] = useSafeState({});
  return useCallback(() => setState({}), []);
};

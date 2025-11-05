// src/test-utils.tsx
import React, { useEffect } from "react";
import { render, act, cleanup } from "@testing-library/react";

/**
 * React 18–compatible renderHook utility for testing custom hooks.
 *
 * @param hook - The hook function to test (receives props as argument)
 * @param options - Optional initialProps to pass into the hook
 * @returns result, rerender, unmount, and act
 */
export function renderHook<T, P = void>(
  hook: (props: P) => T,
  options?: { initialProps?: P }
) {
  const result: { current: T | null } = { current: null };

  function TestComponent(props: P) {
    const value = hook(props);
    useEffect(() => {
      result.current = value;
    }, [value]);
    return null;
  }

  const { initialProps } = options || {};
  const utils = render(<TestComponent {...(initialProps as any)} />);

  return {
    result,
    rerender: (newProps: P) =>
      utils.rerender(<TestComponent {...(newProps as any)} />),
    unmount: () => cleanup(),
  };
}

export { act };

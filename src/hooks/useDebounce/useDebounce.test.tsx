import { renderHook, act } from "../../test-utils";
import { vi } from "vitest";
import { useDebounce } from "./index";

vi.useFakeTimers();

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 300));
    expect(result.current).toBe("initial");
  });

  it("should update after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: "start" },
      }
    );

    act(() => {
      rerender({ value: "updated" });
      vi.advanceTimersByTime(150);
    });

    // Fast-forward but before delay threshold
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("start");

    // Advance full delay
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("updated");
  });

  it("should reset timer on rapid changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: "first" },
      }
    );

    // Change to "second" after 150ms
    act(() => {
      rerender({ value: "second" });
      vi.advanceTimersByTime(150);
    });

    // Change to "third" before debounce delay finishes
    act(() => {
      rerender({ value: "third" });
      vi.advanceTimersByTime(150);
    });

    // Wait for debounce delay to complete
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("third");
  });
});

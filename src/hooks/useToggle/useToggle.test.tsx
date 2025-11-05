import { renderHook, act } from "../../test-utils";
import { useToggle } from "./index";

describe("useToggle", () => {
  it("should initialize with default false", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current?.on).toBe(false);
  });

  it("should initialize with provided value", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current?.on).toBe(true);
  });

  it("should toggle state", () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current?.toggle();
    });
    expect(result.current?.on).toBe(true);
    act(() => {
      result.current?.toggle();
    });
    expect(result.current?.on).toBe(false);
  });

  it("should set explicit boolean value", () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current?.toggle(true);
    });
    expect(result.current?.on).toBe(true);
    act(() => {
      result.current?.toggle(false);
    });
    expect(result.current?.on).toBe(false);
  });
});

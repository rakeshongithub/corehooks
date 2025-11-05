import { renderHook, act } from "../../test-utils";
import { useLocalStorage } from "./index";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with default value when key missing", () => {
    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    const [value] = result.current as any;
    expect(value).toBe("light");
  });

  it("should read value from localStorage if present", () => {
    localStorage.setItem("theme", JSON.stringify("dark"));
    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    const [value] = result.current as any;
    expect(value).toBe("dark");
  });

  it("should update stored value and persist to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("count", 0));

    act(() => {
      const [, setCount] = result.current as any;
      setCount(1); // ✅ updates both state and localStorage
    });

    const [value] = result.current as any;
    expect(value).toBe(1);
    expect(JSON.parse(localStorage.getItem("count")!)).toBe(1);
  });

  it("should update using callback function", () => {
    const { result } = renderHook(() => useLocalStorage("counter", 10));

    act(() => {
      result.current?.[1]((prev) => prev + 1);
    });

    const [value] = result.current as any;
    expect(value).toBe(11);
    expect(JSON.parse(localStorage.getItem("counter")!)).toBe(11);
  });
});

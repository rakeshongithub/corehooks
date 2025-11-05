import { renderHook, act } from "../../test-utils";
import { vi } from "vitest";
import { useAsync } from "./index";

describe("useAsync", () => {
  it("should handle success (lazy mode)", async () => {
    const fn = vi.fn().mockResolvedValue("done");
    const { result } = renderHook(() => useAsync(fn, [], false)); // ✅ keep result reference

    expect(result.current?.loading).toBe(false);
    expect(result.current?.value).toBeNull();

    await act(async () => {
      await result.current?.execute(); // runs async fn and updates state
    });

    // React re-renders, so you must re-check result.current?
    expect(result.current?.loading).toBe(false);
    expect(result.current?.value).toBe("done"); // ✅ now passes
    expect(result.current?.error).toBeNull();
  });

  it("should auto-execute when immediate=true", async () => {
    const fn = vi.fn().mockResolvedValue("auto");
    const { result } = renderHook(() => useAsync(fn, [], true)); // ✅ keep result reference

    // The hook auto-executes immediately on mount
    expect(result.current?.loading).toBe(true);
    expect(result.current?.value).toBeNull();

    // Wait for async operation to finish
    await act(async () => {
      // The hook already started executing automatically,
      // so you don't technically need to call execute() again.
      // But calling it explicitly is safe (idempotent).
      await result.current?.execute();
    });

    // React re-rendered — result.current? now reflects new state
    expect(result.current?.loading).toBe(false);
    expect(result.current?.value).toBe("auto");
    expect(result.current?.error).toBeNull();
  });
});

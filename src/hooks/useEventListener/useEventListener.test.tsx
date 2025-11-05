import { renderHook } from "../../test-utils";
import { vi } from "vitest";
import { useEventListener } from "./index";

describe("useEventListener", () => {
  it("should add and remove window event listener", () => {
    const handler = vi.fn();

    const result = renderHook(() => useEventListener("click", handler, window));

    // Dispatch an event while hook is mounted
    window.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);

    // Cleanup happens on unmount
    (result as any).unmount?.();
    window.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should handle element event listener", () => {
    const div = document.createElement("div");
    const handler = vi.fn();

    renderHook(() => useEventListener("mouseenter", handler, div));

    div.dispatchEvent(new Event("mouseenter"));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

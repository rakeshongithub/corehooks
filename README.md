# 🪝 CoreHooks — Collection of Essential React Hooks

**CoreHooks** is a lightweight, tree-shakeable collection of **highly reusable React hooks** built for modern React (18+).

Created by [**@rakeshongithub**](https://github.com/rakeshongithub), it focuses on practical, real-world hooks you’ll use in every project — from local storage and async management to event listeners and debouncing.

---

## 🚀 Features

✅ Written in **TypeScript** — full type safety  
✅ **Tree-shakeable** — import only what you need  
✅ Built with **Rollup** — optimized for both ESM & CJS  
✅ Tested with **Vitest + React Testing Library**  
✅ Ready for **React 18 concurrent mode**

---

## 📦 Installation

```bash
npm install corehooks
# or
yarn add corehooks
```

---

## 🧩 Usage Examples

### 1. useToggle()

A simple state toggle hook — great for boolean flags, modals, dropdowns, etc.

```javascript
import { useToggle } from "corehooks";

function ToggleExample() {
  const { on, toggle } = useToggle(false);

  return <button onClick={() => toggle()}>{on ? "ON" : "OFF"}</button>;
}
```

#### API

```Javascript
const { on, toggle } = useToggle(initialValue?: boolean);
```

- `on` → current boolean value
- `toggle(nextValue?: boolean)` → flips or sets explicitly

### 2. useDebounce()

Delays updates to a value until after a given delay — useful for search inputs and API calls.

```javascript
import { useDebounce } from "corehooks";

function SearchInput() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 300);

  useEffect(() => {
    // fetch API after 300ms pause
    if (debouncedText) {
      fetch(`/api/search?q=${debouncedText}`);
    }
  }, [debouncedText]);

  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}
```

#### API

```javascript
const debouncedValue = useDebounce<T>(value: T, delay: number);
```

### 3. useEventListener()

Safely attach and clean up DOM or window event listeners.

```javascript
import { useEventListener } from "corehooks";

function ResizeLogger() {
  useEventListener("resize", () => {
    console.log("Window resized:", window.innerWidth);
  });

  return <div>Check the console when resizing</div>;
}
```

#### API

```javascript
useEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: HTMLElement | Window | Document
);
```

- Automatically removes listeners on unmount.
- Defaults to window if no element is provided.

### 4. useLocalStorage()

Persist state to localStorage — fully typed and synced automatically.

```javascript
import { useLocalStorage } from "corehooks";

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌞 Light" : "🌚 Dark"}
    </button>
  );
}
```

#### API

```javascript
const [value, setValue] = useLocalStorage<T>(key: string, initialValue: T);
```

- Reads initial value from localStorage (if exists).
- Automatically writes updates back to storage.

### 5. useAsync()

Manage async operations with loading, error, and value states — ideal for fetching data.

```javascript
import { useAsync } from "corehooks";

function DataFetcher() {
  const fetchData = () => fetch("/api/data").then((res) => res.json());
  const { loading, error, value, execute } = useAsync(fetchData, [], false);

  return (
    <div>
      <button onClick={execute} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      {error && <p style={{ color: "red" }}>{String(error)}</p>}
      {value && <pre>{JSON.stringify(value, null, 2)}</pre>}
    </div>
  );
}
```

#### API

```javascript
const { loading, error, value, execute } = useAsync<T>(
  fn: () => Promise<T>,
  deps?: any[],
  immediate?: boolean
);
```

- `immediate = true` → auto-runs on mount
- `immediate = false` → run manually with execute()
- Handles loading & error states gracefully

---

### 🌳 Tree-Shaking Ready

Each hook is exported separately to keep bundle sizes small:

```javascript
import { useToggle } from "corehooks/useToggle";
import { useAsync } from "corehooks/useAsync";
```

Or import all from root:

```javascript
import { useToggle, useLocalStorage } from "corehooks";
```

---

### 🧪 Testing

Run all unit tests using Vitest:

```javascript
npm test
```

> **Note:** Each hook is fully covered with React 18–compatible tests using @testing-library/react.

---

### 📄 License

MIT © [Rakesh Kumar](https://github.com/rakeshongithub)  
This project is open source and available under the [MIT License](LICENSE).

# Copilot Instructions

## Tech Stack

- **Framework**: Astro 6 with Preact islands (`@astrojs/preact`). Routing and layouts live in `src/pages/` and `src/layouts/`. Content collections (blog posts, portfolio) are in `src/content/` and typed via Zod in `src/content.config.ts`.
- **UI library**: Preact (not React). All imports come from `preact` and `preact/hooks`. Never import from `react`.
- **CSS**: UnoCSS with `presetWind3` (Tailwind-compatible). Always use **semantic design tokens** (`bg-background`, `text-on-surface`, `bg-surface-container-*`, `text-primary`, `border-outline-variant`, etc.) — never raw color classes like `bg-blue-500`. Dark mode is class-based.
- **Class merging**: Use the `classnames` package (`import classNames from "classnames"`) for all conditional class merging. Static multi-line strings use `@netlify/classnames-template-literals` (`ctl`).
- **Path alias**: `~/` resolves to `src/`. Use it for all non-relative imports across `src/`.
- **Tests**: Vitest 4 + `@testing-library/preact` + `@testing-library/user-event`. E2E tests use Playwright and live in `e2e/` — do not mix them with unit tests.

---

## Component Conventions

- Functional Preact components, default export. Named exports are the exception, not the rule.
- Define a local `interface Props` or `type Props` — never export it unless it is consumed elsewhere.
- For components wrapping a native HTML element, extend `JSX.HTMLAttributes<HTMLElement>` and spread `{...props}` onto the element:
  ```tsx
  type Props = { isOpen?: boolean } & JSX.HTMLAttributes<HTMLElement>;
  const Drawer = ({ isOpen = false, className, ...props }: Props) => { ... };
  ```
- Extract `className` from props and always merge it with base classes via `classNames(baseClasses, className as string)`. The `as string` cast is required because Preact types `className` as `SignalLike<string | undefined>`.
- Add `data-testid` to structurally significant elements. Use kebab-case descriptive names (e.g., `portfolio-media-thumbnail`, `desktop-nav`).

---

## Testing Conventions

### What to assert

- Assert **behaviour and content**: text, roles, attributes (`toHaveAttribute`), presence/absence (`toBeInTheDocument`, `not.toBeInTheDocument`), and counts (`toHaveLength`).
- **Do NOT assert `className` values.** CSS class names are implementation details that may change at any time. Do not use `toHaveClass`, `not.toHaveClass`, or any class-based assertion in tests.

### Structure

- Co-locate test files with their source file (e.g., `Foo.tsx` → `Foo.test.tsx`). Never create a separate `__tests__` directory.
- Use **flat `it(...)` blocks** for component tests. Reserve `describe(...)` for pure utility/helper modules where grouping by function name adds clarity.
- `it` and `test` are available as globals — import them only if needed for explicitness alongside other named vitest imports.

### Rendering and queries

```tsx
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event"; // only when testing interactions

it("renders the heading", () => {
  render(<MyComponent title="Hello" />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
```

- Prefer `screen.getByRole(...)` for interactive elements and `screen.getByText(...)` for content.
- Use `screen.queryBy*` when asserting absence.
- Use `within(screen.getByTestId("..."))` to scope queries to a subtree.
- Destructure `{ container }` from `render(...)` only when you need to inspect the raw DOM structure (e.g., `container.firstElementChild`).

### Mocking

- Mock heavy or DOM-incompatible dependencies with `vi.mock(...)` placed **before** the component import (Vitest hoists it automatically):

  ```tsx
  import { vi } from "vitest";

  vi.mock("~/components/portfolio/Slider/Slider", () => ({
    default: ({ children }: { children: preact.ComponentChildren }) => (
      <div data-testid="portfolio-media-slider">{children}</div>
    ),
  }));

  import PortfolioMedia from "./PortfolioMedia";
  ```

- Use `vi.fn()` for callback prop spies and assert with `expect(fn).toHaveBeenCalled()`.

---

## General Rules

- Never use raw hex colors or non-token Tailwind color classes.
- Prefer `Pick<FrontmatterType, 'prop1' | 'prop2'>` when a component only needs a subset of a domain type.
- Reusable class-string constants belong in `src/theme.ts` or at module scope, not inline in JSX.
- All interactive components should be keyboard accessible (`tabIndex`, `onFocus`, `onBlur`).

# Design System Document

## 1. Overview & Creative North Star

### Creative North Star: "The Ethereal Laboratory"

This design system is a bridge between the clinical precision of a high-tech terminal and the boundless curiosity of futuristic research. Inspired by the advanced aesthetics of a laboratory at the edge of the world, it prioritizes data density, holographic depth, and a "digital-first" editorial feel.

Unlike standard grid-heavy frameworks, this system breaks the "template" look through **intentional asymmetry and atmospheric layering**. It mimics a high-end HUD (Heads-Up Display) where information floats over a deep, dark expanse. By utilizing overlapping elements and high-contrast typography scales, we create an experience that feels alive, reactive, and bespoke—moving away from the flat, static web and toward a tactile, scientific interface.

---

## 2. Colors

The palette is anchored in deep blacks and tech-grays, punctuated by neon accents that serve as functional signals within the "laboratory."

### Color Roles

- **Primary (`#8fd6ff` / `#00bfff`):** The "Hologram Cyan." Used for primary interactions and key data points.
- **Secondary (`#66dd8b` / `#25a55a`):** The "Bio-Link Lime." Used for success states and growth metrics.
- **Tertiary (`#ffbeb3` / `#ff9585`):** The "Alert Magenta." Used for high-priority notifications and creative flair.

### The "No-Line" Rule

To maintain the ethereal, holographic feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries between content areas must be defined exclusively through:

1.  **Background Color Shifts:** Placing a `surface-container-low` section against a `surface` background.
2.  **Tonal Transitions:** Using subtle shifts in the Material Design surface tiers to signify the start of a new module.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. Use the surface-container tiers (`lowest` to `highest`) to create depth. An inner data module (nested) should always occupy a higher tier than its parent container to suggest a physical "lift."

### Glass & Gradient Rule

Floating elements (like modals or hovering navigation panels) must utilize **Glassmorphism**. Apply semi-transparent surface colors with a `backdrop-blur` effect.

- **Signature Texture:** Use linear gradients (e.g., `primary` to `primary-container` at 45 degrees) for CTAs to give them a "glowing" energy that flat colors lack.

---

## 3. Typography

The typography strategy leverages a high-contrast pairing to balance technical precision with editorial authority.

- **Display & Headlines (`Space Grotesk`):** A clean, tech-forward sans-serif that commands attention. The wide apertures and geometric forms mimic the digital signage of a futuristic terminal.
- **Body & Titles (`Inter`):** Chosen for its exceptional readability at small sizes. It provides the "human" anchor to the technical aesthetic.
- **Code & Metadata (`ui-monospace`):** Reserved for technical snippets, timestamps, and "system readouts." This font is the voice of the machine.

**The Hierarchy Goal:** Use `display-lg` for hero moments to create a "poster-like" impact, while `label-sm` in monospace is used for auxiliary data, reinforcing the dashboard theme.

---

## 4. Elevation & Depth

Hierarchy is achieved through **Tonal Layering** rather than traditional drop shadows or structural lines.

- **The Layering Principle:** Stack surfaces to create natural elevation. A `surface-container-highest` card sitting on a `surface-container-low` background creates a clear visual hierarchy without the clutter of lines.
- **Ambient Shadows:** When an element must float (like a floating action button), use extra-diffused shadows.
  - **Specs:** Blur 24px-40px, Opacity 6%, Color: `on-surface` (tinted).
- **The "Ghost Border" Fallback:** If a container requires a boundary for accessibility, use a "Ghost Border": the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
- **Holographic Glow:** Interactive elements should omit shadows in favor of a `surface-tint` outer glow to simulate light emitting from a screen.

---

## 5. Components

### Buttons

- **Primary:** Rounded (`full` / pill-shaped), `primary` background, `on-primary` text. Add a subtle outer glow using the primary color on hover.
- **Secondary:** Transparent background with a "Ghost Border" and `primary` text.
- **Tertiary:** Monospace text, all-caps, with a leading "01" prefix to mimic terminal commands.

### Cards (Data Modules)

Cards must look like independent laboratory modules. **Forbid divider lines.**

- Use `spacing-6` (1.5rem) to separate internal content.
- Headers should be set in `label-md` monospace for a "Serial Number" look.
- Use `surface-container-low` for the card body.

### Inputs (Terminal Fields)

- **Style:** Underline only (using `outline-variant` at 30%) or a fully enclosed `surface-container-highest` block.
- **Active State:** The underline or background should transition to a `primary` glow.
- **Label:** Always use `label-sm` monospace, positioned above the field like a data field header.

### Chips (Status Tags)

- Small, pill-shaped (`full` roundedness).
- Use `secondary-container` for active states to look like a "system-ready" light.

### Control Panels (Header/Footer)

The header and footer should mimic a physical control console. Use `surface-container-lowest` with a high `backdrop-blur`. Incorporate the **'hrgui'** branding in a monospace, lowercase style with a blinking cursor suffix (`hrgui_`).

---

## 6. Do's and Don'ts

### Do

- **Do** use intentional asymmetry. Place a small monospace label off-center to a large headline.
- **Do** use high-contrast spacing. Let elements breathe to emphasize their importance.
- **Do** utilize "data-ink." Every element should look like it serves a functional, scientific purpose.
- **Do** ensure all "glass" elements remain legible by testing against various background densities.

### Don't

- **Don't** use solid black (#000) for backgrounds; use `surface` (#121414) to allow for depth.
- **Don't** use standard 1px dividers. If a separation is needed, use a `1px` height `surface-variant` box with 20% opacity.
- **Don't** over-use neon colors. They are "energy sources"—if everything glows, nothing is important.
- **Don't** use "drop shadows" that cast downwards; keep shadows centered and diffused to mimic ambient environmental light.

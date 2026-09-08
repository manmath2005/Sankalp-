# Sankalp Admin & Corporate Portals Design Spec

## 1. Overview
This specification details the UI/UX, accessibility, and functional enhancements for the `AdminDbmsView` and `CorporatePartnerView` in the Sankalp platform. The goal is to elevate these portals to production-grade standards using a unified design system, ensuring they are accessible, responsive, and robust.

## 2. Architecture & Components

### 2.1 CorporatePartnerView (Host Drive Portal)
- **Grid Layout**: Implement a responsive CSS Grid (1 column on mobile, 2 on tablet, 3 on desktop) for the NGO directory cards.
- **Micro-interactions**: 
  - Add transition classes (`transition-all duration-200`) to cards.
  - Implement active, hover, and focus-visible states on all interactive elements.
- **Accessibility**:
  - Add `aria-live="polite"` to search results to notify screen readers of updates.
  - Ensure modals (`CorporateRequestModal`) trap focus and can be closed with the `Escape` key.
  - Use semantic HTML tags (`<section>`, `<article>`, `<header>`).

### 2.2 AdminDbmsView (Master DBMS Control)
- **Visual Hierarchy**:
  - Unify analytics cards with consistent padding (`p-6`), rounded corners (`rounded-2xl`), and subtle borders/shadows (`shadow-sm border-slate-200`).
- **Responsive Tables**:
  - Wrap existing tables in `overflow-x-auto` containers with custom scrollbars.
  - Ensure table headers contrast properly with the background for readability.
- **Form Enhancements**:
  - Add form validation indicators (red outlines for invalid fields, green for valid).
  - Add loading states (spinners) to buttons like "Export DB" and "Broadcast SOS".

## 3. Design Tokens (Tailwind System)
- **Spacing**: Base 4px system (`p-2` = 8px, `p-4` = 16px, `p-6` = 24px).
- **Typography**: Emphasize hierarchy (Text: `text-xs`, `text-sm`, Headings: `text-xl`, `text-2xl font-extrabold`).
- **Colors**:
  - Primary Action: `indigo-600`
  - Secondary: `slate-100`
  - Success: `emerald-600`
  - Warning/SOS: `red-600`
  - Text: `slate-900` for primary, `slate-600` for secondary.

## 4. Testing Plan
- **Accessibility Testing**: Navigate both portals entirely using a keyboard (Tab, Enter, Space). Verify focus outlines are visible.
- **Responsive Testing**: View portals at 320px, 768px, and 1024px breakpoints.
- **Functional Testing**: Submit a mock corporate request and verify it appears in the Admin DBMS.

## 5. Security & Edge Cases
- Ensure role-based access control (RBAC) validations are strictly maintained in the views.
- Handle empty states gracefully (e.g., "No NGOs match your filter" instead of a blank screen).

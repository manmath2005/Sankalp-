# Admin & Corporate Portals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement CSS Grid, accessibility improvements, and responsive table enhancements for the Admin and Corporate portals.

**Architecture:** We will modify the existing `CorporatePartnerView.jsx` and `AdminDbmsView.jsx` to incorporate better Tailwind grid classes, transitions, and `aria` attributes. 

**Tech Stack:** React, Tailwind CSS, Lucide React

**Spec:** `docs/superpowers/specs/2026-09-08-admin-corporate-portals-design.md`

## Global Constraints

- Must maintain existing role-based access control (RBAC).
- Must not break the existing mock data structures.

---

### Task 1: CorporatePartnerView UI/UX & Grid Enhancements

**Files:**
- Modify: `src/views/CorporatePartnerView.jsx`

**Interfaces:**
- Consumes: Existing NGO data arrays.
- Produces: A responsive grid layout with hover effects.

- [ ] **Step 1: Write UI updates for NGO Directory**
```javascript
// Inside CorporatePartnerView.jsx, locate the NGO mapping block
// Change the outer div from space-y-4 to grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredNgos.map((ngo, idx) => (
    <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      {/* ... existing card content ... */}
    </div>
  ))}
</div>
```

- [ ] **Step 2: Add Accessibility to Tabs**
```javascript
// Add aria-labels and role="tablist" to the tabs
<nav role="tablist" className="flex items-center ...">
  <button role="tab" aria-selected={activeSection === 'directory'} ...>
```

- [ ] **Step 3: Commit**
```bash
git add src/views/CorporatePartnerView.jsx
git commit -m "feat: enhance CorporatePartnerView with grid layout and a11y"
```

### Task 2: AdminDbmsView Responsive Tables & Forms

**Files:**
- Modify: `src/views/AdminDbmsView.jsx`

**Interfaces:**
- Consumes: Existing DB context.
- Produces: Accessible tables wrapped in scrollable containers.

- [ ] **Step 1: Wrap tables in overflow containers**
```javascript
// Wrap existing <table> elements with:
<div className="overflow-x-auto w-full rounded-xl border border-slate-200 dark:border-slate-700">
  <table className="w-full text-left border-collapse min-w-[600px]">
    {/* ... */}
  </table>
</div>
```

- [ ] **Step 2: Add visual hierarchy to Analytics Cards**
```javascript
// Ensure stats cards have unified paddings
<div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
```

- [ ] **Step 3: Commit**
```bash
git add src/views/AdminDbmsView.jsx
git commit -m "feat: enhance AdminDbmsView with responsive tables and unified cards"
```

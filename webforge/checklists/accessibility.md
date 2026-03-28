# Accessibility Testing Checklist

> Detailed accessibility testing guide. Use this in addition to automated tools.

---

## Automated Testing Setup

### axe-core with Playwright
```typescript
// tests/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/hakkimizda', '/iletisim', '/sss', '/gizlilik'];

for (const page of pages) {
  test(`a11y: ${page}`, async ({ page: p }) => {
    await p.goto(page);
    const results = await new AxeBuilder({ page: p })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
```

### ESLint jsx-a11y Plugin
```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"],
  "rules": {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/no-static-element-interactions": "error",
    "jsx-a11y/label-has-associated-control": "error"
  }
}
```

---

## Manual Testing Protocol

### Step 1: Keyboard Navigation Test

Put away your mouse. Navigate the entire site using only:

| Key | Action |
|-----|--------|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous focusable element |
| Enter | Activate link or button |
| Space | Activate button, toggle checkbox |
| Escape | Close modal, dropdown, popup |
| Arrow keys | Navigate within menus, tabs, radio groups |

**Check:**
- Can you reach EVERY interactive element?
- Can you see where focus is at ALL times?
- Can you operate EVERY feature without a mouse?
- Is the tab order logical (follows visual layout)?
- Can you escape from modals and return to trigger?

### Step 2: Screen Reader Test

Test with at least ONE screen reader:

| OS | Screen Reader | Key Command |
|----|--------------|-------------|
| macOS | VoiceOver | Cmd+F5 to enable |
| Windows | NVDA (free) | Ctrl+Alt+N to enable |
| Windows | Narrator | Win+Ctrl+Enter |

**Check:**
- Is the page title announced correctly?
- Are headings announced in correct order?
- Are all images described (alt text read)?
- Are form fields labeled correctly?
- Are error messages announced?
- Do buttons have descriptive labels?
- Are decorative images hidden (alt="")?

### Step 3: Visual Inspection

**Color Contrast:**
- Use browser DevTools → Accessibility panel
- Or use Chrome extension "WCAG Color Contrast Checker"
- Normal text: 4.5:1 ratio minimum
- Large text (18px+ or 14px+ bold): 3:1 ratio minimum

**Zoom Test:**
1. Zoom to 200% (Ctrl/Cmd + Plus, 4 times from 100%)
2. Check: Does content reflow? No horizontal scroll?
3. Check: Is all text still readable?
4. Check: Are all interactive elements still accessible?

**Reduced Motion:**
1. Enable "Reduce motion" in OS settings
   - macOS: System Settings → Accessibility → Display → Reduce motion
   - Windows: Settings → Accessibility → Visual effects → Animation effects OFF
2. Check: Are animations disabled or reduced?
3. Check: Are transitions minimal (opacity/fade only)?

### Step 4: Component-Specific Checks

#### Cookie Banner
- [ ] Focus moves to banner when it appears
- [ ] All buttons reachable via Tab
- [ ] Preferences modal traps focus
- [ ] Escape closes modal
- [ ] Category toggles are proper switches
- [ ] Screen reader announces consent saved

#### Navigation
- [ ] Mobile menu opens/closes with keyboard
- [ ] Current page is indicated (aria-current="page")
- [ ] Dropdown menus accessible via keyboard
- [ ] Menu closes on Escape

#### Forms
- [ ] Every field has a visible label
- [ ] Labels are programmatically associated (htmlFor/id)
- [ ] Required fields have aria-required="true"
- [ ] Error messages use aria-describedby
- [ ] Error summary announced on submission failure
- [ ] Success message announced after submission

#### Modals/Dialogs
- [ ] Focus moves to modal on open
- [ ] Focus trapped inside modal
- [ ] Escape closes modal
- [ ] Focus returns to trigger on close
- [ ] Background content has aria-hidden="true"
- [ ] Modal has role="dialog" and aria-label

#### Images
- [ ] Informative images have descriptive alt text
- [ ] Decorative images have alt=""
- [ ] Complex images have longer descriptions (aria-describedby)
- [ ] Icons have accessible labels (sr-only text or aria-label)

#### Tables (if used)
- [ ] Tables have `<caption>`
- [ ] Header cells use `<th>` with scope
- [ ] Complex tables use id/headers attributes

---

## WCAG 2.2 AA — Quick Reference

### Perceivable
- 1.1.1 Non-text Content → alt text
- 1.3.1 Info and Relationships → semantic HTML
- 1.3.5 Identify Input Purpose → autocomplete attributes
- 1.4.3 Contrast (Minimum) → 4.5:1 / 3:1
- 1.4.4 Resize Text → 200% zoom
- 1.4.10 Reflow → No horizontal scroll at 320px
- 1.4.11 Non-text Contrast → UI components 3:1
- 1.4.12 Text Spacing → Customizable without breaking
- 1.4.13 Content on Hover/Focus → Dismissible, persistent

### Operable
- 2.1.1 Keyboard → All functionality via keyboard
- 2.1.2 No Keyboard Trap → Can always Tab out
- 2.4.1 Bypass Blocks → Skip nav link
- 2.4.2 Page Titled → Descriptive titles
- 2.4.3 Focus Order → Logical sequence
- 2.4.6 Headings and Labels → Descriptive
- 2.4.7 Focus Visible → Clearly visible focus
- 2.4.11 Focus Not Obscured → Focus not hidden behind sticky elements
- 2.5.8 Target Size (Minimum) → 24x24px minimum

### Understandable
- 3.1.1 Language of Page → lang attribute
- 3.1.2 Language of Parts → lang on foreign text
- 3.2.1 On Focus → No unexpected changes
- 3.2.2 On Input → No unexpected changes
- 3.3.1 Error Identification → Errors described in text
- 3.3.2 Labels or Instructions → Clear labels
- 3.3.3 Error Suggestion → Suggest correction

### Robust
- 4.1.2 Name, Role, Value → ARIA when needed
- 4.1.3 Status Messages → aria-live for dynamic content

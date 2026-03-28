# Animation & Motion System Specification

> Animasyon estetik icin var, engel olmamali. reduced-motion ZORUNLU.

---

## Core Rules

1. **Her animasyon bir amaca hizmet etmeli** — dekorasyon degil, kullanici rehberligi
2. **prefers-reduced-motion ZORUNLU** — hareket hassasiyeti olan kullanicilar icin
3. **60fps hedefi** — jank olmayacak, `transform` ve `opacity` tercih et
4. **300ms max sure** — kullanici beklemeyecek, mikro-etkilesimler kisa olmali
5. **GPU-friendly** — `transform`, `opacity` kullan; `width`, `height`, `top`, `left` animasyonu YAPMA

---

## Preferred Library

```
Discovery'de sorulur:
- [x] CSS transitions + Tailwind (varsayilan — en hafif)
- [ ] Framer Motion (zengin animasyonlar, sayfa gecisleri)
- [ ] GSAP (karmasik animasyonlar, timeline)
- [ ] Animasyon istemiyorum (sadece hover/focus gecisleri)
```

---

## Reduced Motion (MANDATORY)

```css
/* Global: tum animasyonlari kapat */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```typescript
// Hook: programmatic check
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return reduced;
}

// Usage with Framer Motion
function AnimatedComponent() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

---

## Animation Categories

### 1. Micro-interactions (CSS only — no library needed)

```css
/* Button hover */
.btn {
  transition: background-color 150ms ease, transform 100ms ease;
}
.btn:hover {
  transform: translateY(-1px);
}
.btn:active {
  transform: translateY(0);
}

/* Link underline */
.link {
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 200ms ease;
}
.link:hover {
  background-size: 100% 1px;
}

/* Card hover */
.card {
  transition: box-shadow 200ms ease, transform 200ms ease;
}
.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### 2. Enter Animations (Scroll-triggered)

```css
/* Tailwind + CSS: fade in on scroll */
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms ease, transform 400ms ease;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```typescript
// Intersection Observer hook
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// Usage
function Section() {
  const { ref, visible } = useScrollAnimation();
  return (
    <div ref={ref} className={`animate-in ${visible ? 'visible' : ''}`}>
      Content appears on scroll
    </div>
  );
}
```

### 3. Page Transitions (Framer Motion — only if chosen)

```tsx
// src/components/layout/page-transition.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 4. Loading States

```css
/* Skeleton pulse — CSS only */
.skeleton {
  background: linear-gradient(90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--muted) / 0.5) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Spinner — CSS only */
.spinner {
  width: 20px; height: 20px;
  border: 2px solid hsl(var(--muted));
  border-top-color: hsl(var(--primary));
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Performance Rules

| Property | GPU Accelerated | Use For |
|----------|----------------|---------|
| `transform` | ✅ Yes | Move, scale, rotate |
| `opacity` | ✅ Yes | Fade in/out |
| `filter` | ✅ Yes | Blur, brightness |
| `width/height` | ❌ No | AVOID animating |
| `top/left/right/bottom` | ❌ No | Use transform: translate() instead |
| `margin/padding` | ❌ No | AVOID animating |
| `border` | ❌ No | AVOID animating |
| `color/background` | ⚠️ Partial | OK for small elements |

### will-change (Use Sparingly)
```css
/* Only on elements that WILL animate — not everything */
.will-animate {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animation-done {
  will-change: auto;
}
```

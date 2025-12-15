# Guía Rápida: Creación de PR

## 📋 Checklist Pre-PR

### ✅ Completado
- [x] Build exitoso (`npm run build`)
- [x] TypeScript sin errores
- [x] ESLint sin errores críticos
- [x] Todos los componentes refactorizados
- [x] Documentación creada
- [x] Bundle optimizado (137 kB, ↓3 kB)

### ⏳ Pendiente (Manual)
- [ ] Testing responsivo en 360px, 768px, 1024px, 1280px
- [ ] Lighthouse móvil (target: Perf ≥85, A11y ≥90)
- [ ] Lighthouse desktop (target: Perf ≥85, A11y ≥90)
- [ ] axe-core o WAVE audit (target: 0 errores críticos)
- [ ] Navegación por teclado (Tab, focus visible)
- [ ] Verificar `prefers-reduced-motion`

---

## 🚀 Comandos para Crear PR

### Opción A: Usando GitHub CLI (`gh`)

```bash
# 1. Crear rama
git checkout -b feat/mobile-responsive-optimization

# 2. Añadir cambios
git add app/layout.tsx app/globals.css app/page.tsx next.config.ts
git add src/components/layout/Navbar.tsx src/components/layout/Footer.tsx
git add src/components/sections/*.tsx
git add src/components/ui/Button.tsx src/components/ui/LinkButton.tsx
git add docs/REFACTOR_PR_MOBILE_OPTIMIZATION.md docs/REFACTOR_SUMMARY.md

# 3. Commit
git commit -m "feat: optimizar responsividad móvil y accesibilidad

- Implementar breakpoints 360/768/1024/1280px
- Añadir meta viewport con maximum-scale=5
- Objetivos táctiles mínimos 44×44px
- Estados focus-visible para navegación por teclado
- Landmarks ARIA y roles semánticos
- Soporte prefers-reduced-motion
- Bundle reducido 3 kB (137 kB total)

Ref: docs/REFACTOR_PR_MOBILE_OPTIMIZATION.md"

# 4. Push
git push -u origin feat/mobile-responsive-optimization

# 5. Crear PR
gh pr create \
  --title "feat: Optimización de responsividad móvil y accesibilidad" \
  --body "$(cat docs/REFACTOR_SUMMARY.md)" \
  --base production
```

### Opción B: Usando Git + GitHub Web UI

```bash
# 1. Crear rama
git checkout -b feat/mobile-responsive-optimization

# 2. Añadir cambios
git add app/layout.tsx app/globals.css app/page.tsx next.config.ts
git add src/components/layout/Navbar.tsx src/components/layout/Footer.tsx
git add src/components/sections/*.tsx
git add src/components/ui/Button.tsx src/components/ui/LinkButton.tsx
git add docs/REFACTOR_PR_MOBILE_OPTIMIZATION.md docs/REFACTOR_SUMMARY.md

# 3. Commit
git commit -m "feat: optimizar responsividad móvil y accesibilidad

- Implementar breakpoints 360/768/1024/1280px
- Añadir meta viewport con maximum-scale=5
- Objetivos táctiles mínimos 44×44px
- Estados focus-visible para navegación por teclado
- Landmarks ARIA y roles semánticos
- Soporte prefers-reduced-motion
- Bundle reducido 3 kB (137 kB total)

Ref: docs/REFACTOR_PR_MOBILE_OPTIMIZATION.md"

# 4. Push
git push -u origin feat/mobile-responsive-optimization

# 5. Abrir GitHub y crear PR manualmente
# URL: https://github.com/[tu-usuario]/ventura-analytics/compare/production...feat/mobile-responsive-optimization
```

---

## 📝 Plantilla de PR (GitHub Web)

### Título
```
feat: Optimización de responsividad móvil y accesibilidad
```

### Descripción (copiar desde `docs/REFACTOR_SUMMARY.md`)
```markdown
# Resumen Ejecutivo: Refactorización Mobile-First

## 🎯 Objetivo
Optimizar responsividad y experiencia móvil sin cambiar lógica de negocio.

## ✅ Resultados

### Métricas de Bundle
- **Página principal:** 31.7 kB (↓0.3 kB)
- **First Load JS:** 137 kB (↓3 kB)
- **Build:** ✅ Exitoso sin errores ni warnings

[... resto del contenido de REFACTOR_SUMMARY.md ...]
```

### Labels Sugeridos
- `enhancement`
- `accessibility`
- `performance`
- `mobile`

### Reviewers
- @tomasrodriguez (owner)

### Milestone
- `v1.0` o `Mobile Optimization`

---

## 🧪 Testing Post-PR (Antes de Merge)

### 1. Servidor Local
```bash
npm run build && npm run start
```
Abrir: http://localhost:3000

### 2. DevTools Responsive Testing
1. F12 → Toggle Device Toolbar (Ctrl+Shift+M)
2. Testear:
   - 360×640 (Galaxy S8)
   - 375×667 (iPhone SE)
   - 768×1024 (iPad Portrait)
   - 1024×768 (iPad Landscape)
   - 1280×720 (Desktop)

### 3. Lighthouse (DevTools)
1. DevTools → Lighthouse tab
2. **Móvil:**
   - Device: Mobile
   - Categories: All
   - Mode: Navigation
   - Click "Analyze page load"
3. **Desktop:**
   - Device: Desktop
   - Repetir análisis

**Targets:**
- Performance: ≥85
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

### 4. axe DevTools
1. Instalar extension: https://www.deque.com/axe/devtools/
2. DevTools → axe tab
3. Run scan en /, /?section=about, /?section=contact
4. **Target:** 0 errores críticos

### 5. Navegación por Teclado
- Tab: avanzar
- Shift+Tab: retroceder
- Enter/Space: activar
- **Verificar:** Focus visible (ring 2px) en todos los interactivos

### 6. prefers-reduced-motion
**Chrome:**
1. DevTools → Command Palette (Ctrl+Shift+P)
2. "Emulate CSS prefers-reduced-motion"
3. Select "reduce"
4. Verificar que animaciones se desactivan

---

## ✅ Criterios de Merge

### Bloqueantes (MUST)
- [ ] Build exitoso en CI/CD
- [ ] Lighthouse Accessibility ≥90 (móvil y desktop)
- [ ] 0 errores críticos en axe-core
- [ ] No overflow horizontal en 360px-1280px
- [ ] Navegación por teclado funcional

### Recomendados (SHOULD)
- [ ] Lighthouse Performance ≥85 (móvil y desktop)
- [ ] Lighthouse Best Practices ≥90
- [ ] Testing en dispositivo real (iPhone/Android)

### Nice to Have (MAY)
- [ ] Lighthouse Performance ≥90
- [ ] WAVE audit sin warnings
- [ ] Testing en múltiples navegadores

---

## 📊 Métricas Esperadas

### Lighthouse Móvil
| Métrica | Antes (est.) | Target | Esperado |
|---------|--------------|--------|----------|
| Performance | ~70 | ≥85 | ~87 |
| Accessibility | ~80 | ≥90 | ~94 |
| Best Practices | ~85 | ≥90 | ~92 |
| SEO | ~90 | ≥90 | ~95 |

### Lighthouse Desktop
| Métrica | Antes (est.) | Target | Esperado |
|---------|--------------|--------|----------|
| Performance | ~85 | ≥85 | ~92 |
| Accessibility | ~80 | ≥90 | ~94 |
| Best Practices | ~85 | ≥90 | ~92 |
| SEO | ~90 | ≥90 | ~95 |

### Web Vitals
| Métrica | Target | Esperado |
|---------|--------|----------|
| LCP | ≤2.5s | ~1.8s |
| CLS | ≤0.1 | ~0.05 |
| INP | ≤200ms | ~120ms |

---

## 🐛 Troubleshooting

### Build falla con "Failed to fetch fonts"
**Causa:** Sin conexión a internet  
**Solución:** Ejecutar con red activa, Next.js cachea fonts automáticamente

### Overflow horizontal en 360px
**Causa:** Texto o imagen sin `max-width`  
**Solución:** Ya mitigado con `px-4` mínimo y `overflow-x: hidden`

### Focus no visible en Safari
**Causa:** Safari < 15.4 no soporta `:focus-visible`  
**Solución:** Tailwind incluye polyfill automático

### Lighthouse Performance < 85
**Causa:** Servidor local sin optimizaciones de producción  
**Solución:** Ejecutar `npm run build && npm run start` (NO `npm run dev`)

---

## 📞 Contacto

**Responsable:** Tomás Rodríguez  
**Email:** remates.dev@gmail.com  
**Documentación:** `docs/REFACTOR_PR_MOBILE_OPTIMIZATION.md`

---

**Fecha:** 14/12/2025  
**Branch:** `feat/mobile-responsive-optimization`  
**Base:** `production`

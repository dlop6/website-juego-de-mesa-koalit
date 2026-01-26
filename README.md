# The Board Game Vault (Koalit  Test)

Deploy (Vercel): https://website-juego-de-mesa-koalit.vercel.app/

Gracias por revisar. Dejo aquí accesos directos y una guía corta para orientarse rápido por las pantallas y validar comportamientos (especialmente estados async), por si te ahorra tiempo.

---

## Links principales (producción)

- Landing: https://website-juego-de-mesa-koalit.vercel.app/landing  
- Catálogo: https://website-juego-de-mesa-koalit.vercel.app/catalogo  
- Ejemplo de detalle: https://website-juego-de-mesa-koalit.vercel.app/catalogo/g-terraforming-mars  

---

## Resumen

- Landing + catálogo + detalle de juego con estética retro inspirada en pantallas IBM “amber”, pero con layout y jerarquía modernos.
- Componentes consistentes entre pantallas (tipografía, spacing, radios, estados hover/focus).
- Estados asíncronos pensados para UX real (loading/empty/error + retry donde aplica).
- Navegación usable por teclado y focus visible.

---

## Cómo recorrerlo rápido 

Una ruta típica para ver lo principal sería:
1) Landing → 2) Catálogo → 3) Detalle → 4) Volver a catálogo y probar filtros

- Landing: https://website-juego-de-mesa-koalit.vercel.app/landing  
- Catálogo: https://website-juego-de-mesa-koalit.vercel.app/catalogo  
- Detalle: https://website-juego-de-mesa-koalit.vercel.app/catalogo/g-dune-imperium 

---

## Estados asíncronos 

Como esto está en producción, algunos estados dependen de red/datos. Si querés forzarlos de forma controlada, estas opciones suelen funcionar bien:

### Loading / Skeleton
- En DevTools → Network → Throttling: “Slow 3G”
- Recargar /catalogo (hard reload)

Lo esperado: skeletons o loading state visible, sin saltos feos de layout.

### Empty state (sin resultados)
- En /catalogo, ajustar filtros a un rango extremo (por ejemplo, un mínimo muy alto) para quedarte sin resultados.

Lo esperado: mensaje claro de “no hay resultados” y una acción útil como “Limpiar filtros”.



---

## Accesibilidad 
Sin herramientas extra:
- Probar navegar con Tab / Shift+Tab por landing y catálogo
- Confirmar focus visible siempre
- Botones solo-ícono con nombre accesible (aria-label)
- Mensajes de estado (empty/error) claros

---

## Intención del diseño
La intención fue que la estética retro no se sintiera “plantilla”:
- Paleta tipo amber/terminal reinterpretada con composición moderna.
- Microinteracciones discretas (sin glow genérico).
- Jerarquía tipográfica consistente (escala y pesos estables).
- Copy específico, sin frases vagas ni “testimonials” inventados.

---

## Desarrollo local (por si lo necesitás)

```bash
npm install
npm run dev
```
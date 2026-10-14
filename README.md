# CRERISE Coffee Experience — Section 1

This is **Section 1 only** of the requested six-section Next.js experience. It uses Next.js App Router, React Three Fiber, drei, GSAP ScrollTrigger and Lenis. The 3D ceramic cup is an original procedural **visual placeholder**, not a photorealistic scanned asset. No external 3D model license is required.

## Run locally

1. Install Node.js 20 or later.
2. Extract this ZIP.
3. Open a terminal in the extracted folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Visit `http://localhost:3000`.

## Deploy to Cloudflare Pages (static export)

1. Run `npm install` then `npm run build`.
2. Upload the generated `out` folder through Cloudflare Pages Direct Upload. **Do not upload the source ZIP directly**, because Cloudflare Direct Upload cannot build a Next.js project from the ZIP.
3. Alternatively, connect a Git repository to Cloudflare Pages with build command `npm run build` and output directory `out`.

The Google Fonts CSS and drei environment preset require network access. All app code is local after installation. No paid APIs are used.

## Quality and accessibility

- WebGL renders a live 3D cup and saucer; it is not a video or static mockup.
- GSAP ScrollTrigger and Lenis are initialized, with a small scroll-linked text effect. Later sections will introduce the complex choreography.
- Mobile layout avoids horizontal overflow; pixel ratio is capped at 1.6.
- Reduced-motion preference disables GSAP/Lenis and CSS transitions; the 3D idle animation remains gentle (to be further adapted in next iteration).
- A fallback message appears if WebGL cannot initialize. Some GPU/context-loss cases still need testing.
- The visual fidelity is limited by the procedural model. Replace with a professionally modeled, licensed glTF asset for a truly realistic hero.

## Future sections (not implemented)

2. Exploded ingredients and starfield
3. Six interconnected menu cards
4. Click-to-zoom product details
5. Interactive coffee customizer
6. Order CTA

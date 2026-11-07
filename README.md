# Kenshin Ruiz Portfolio

Next.js 15 (App Router) + TypeScript, styled with Tailwind CSS v4 and shadcn/ui components,
animated with Framer Motion, smooth-scrolled with Lenis, and 3D with Spline.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Add your images

Copy these into `public/images/` (the page shows placeholders until they exist):

| File | Used for |
| --- | --- |
| `profile.jpg` | Hero card photo |
| `p1.jpg`, `p2.jpg`, `p3.png`, `p4.png` | Project screenshots |

`certificate1.png` and `certificate2.png` are already there.

## Edit your content

Everything you'd normally change is in `data/content.ts`: roles, projects, tools,
certificates, links and the Spline scene.

## Add your own Spline 3D scene (optional)

Until you add a scene, the About section shows a built-in rotating 3D cube.

1. In Spline, open your scene and choose Export, then Code Export, then copy the `.splinecode` URL.
2. Create `.env.local` in the project root: `NEXT_PUBLIC_SPLINE_SCENE=<your url>`
3. Restart `npm run dev`.

If the scene fails to load, the cube is shown instead.

## Where things are

- `components/sections/` the page sections (Hero, Marquee, Projects, About, Certificates, Contact)
- `components/Aurora.tsx` the animated purple background
- `components/Preloader.tsx` the "Hello, I'm" intro (plays once per visit)
- `components/ui/` shadcn/ui primitives (button, card, dialog, input, and so on)

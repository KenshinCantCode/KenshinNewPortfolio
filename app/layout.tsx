import type { Metadata, Viewport } from "next";
import Providers from "@/components/Providers";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kenshin Ruiz | Full-Stack Web Developer",
  description:
    "Portfolio of Kenshin Ruiz, an IT student who builds responsive websites, web systems and visual identities.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#050309",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

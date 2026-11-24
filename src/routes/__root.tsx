import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PickBar } from "@/components/pick-bar";
import { MobileNavigation } from "@/components/mobile-navigation";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KOTLY.SU — справочник промышленных котлов" },
      { name: "description", content: "Независимый справочник открытых серий. Не сайт производителя и не предложение о продаже." },
      { name: "theme-color", content: "#161616" },
      { property: "og:title", content: "Котлы.pro — справочник промышленных котлов" },
      { property: "og:description", content: "Независимый справочник котлов, горелок и воздухонагревателей. Не сайт завода и не предложение о продаже." },
      { property: "og:image", content: "/og.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Котлы.pro — справочник промышленных котлов" },
      { name: "twitter:description", content: "Независимый справочник котлов, горелок и воздухонагревателей." },
      { name: "twitter:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Unbounded:wght@500;700;800&display=swap" },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
          <MobileNavigation />
          <PickBar />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

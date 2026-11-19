import { Link, createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PickBar } from "@/components/pick-bar";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "KOTLY.SU — справочник промышленных котлов" },
      { name: "description", content: "Независимый справочник открытых серий. Не сайт производителя и не предложение о продаже." },
      { name: "theme-color", content: "#f4f1ee" },
      { property: "og:title", content: "Котлы.pro — справочник промышленных котлов" },
      { property: "og:description", content: "Независимый справочник котлов, горелок и воздухонагревателей. Не сайт завода и не предложение о продаже." },
      { property: "og:locale", content: "ru_RU" },
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
          <PickBar />
          <Toaster position="top-center" richColors />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
      <p className="font-display text-7xl leading-none font-extrabold tracking-[-0.04em] text-accent">404</p>
      <h1 className="text-2xl font-semibold">Страница не найдена</h1>
      <p className="max-w-md text-sm text-muted">
        Такой страницы нет в справочнике. Вернитесь в каталог и выберите производителя.
      </p>
      <Link
        to="/"
        className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
      >
        В каталог
      </Link>
    </div>
  );
}

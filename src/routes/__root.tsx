import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_TITLE = "FinWise AI — Smarter Financial Decisions";
const SITE_DESC =
  "FinWise AI is your AI-powered financial companion: loan eligibility, credit score insights, EMI calculator, and a personal AI advisor.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "FinWise AI — Smarter money decisions, engineered by AI" },
      { property: "og:title", content: "FinWise AI — Smarter money decisions, engineered by AI" },
      { name: "twitter:title", content: "FinWise AI — Smarter money decisions, engineered by AI" },
      { name: "description", content: "AI-powered loan eligibility, credit insights, EMI planning, and a personal financial advisor — unified in one beautifully simple workspace." },
      { property: "og:description", content: "AI-powered loan eligibility, credit insights, EMI planning, and a personal financial advisor — unified in one beautifully simple workspace." },
      { name: "twitter:description", content: "AI-powered loan eligibility, credit insights, EMI planning, and a personal financial advisor — unified in one beautifully simple workspace." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7967bcb4-9a78-4db9-85e2-e5d5f4c93298" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7967bcb4-9a78-4db9-85e2-e5d5f4c93298" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        {/* Ambient background orbs */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-[oklch(0.68_0.19_260/0.35)] blur-3xl [animation:float_9s_ease-in-out_infinite]" />
          <div className="absolute right-[-10%] top-1/3 h-[480px] w-[480px] rounded-full bg-[oklch(0.62_0.22_300/0.30)] blur-3xl [animation:float_11s_ease-in-out_infinite_1s]" />
          <div className="absolute bottom-[-15%] left-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(0.60_0.20_280/0.25)] blur-3xl [animation:float_13s_ease-in-out_infinite_2s]" />
        </div>

        <Header />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            classNames: {
              toast:
                "!bg-[oklch(0.22_0.035_265/0.85)] !backdrop-blur-xl !border !border-[oklch(1_0_0/0.12)] !text-foreground !rounded-2xl !shadow-elegant",
              description: "!text-muted-foreground",
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}

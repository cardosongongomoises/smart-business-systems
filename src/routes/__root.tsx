import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { organizationSchema, websiteSchema, faqSchema } from "../lib/seo-schemas";
import { TooltipProvider } from "../components/ui/tooltip";

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

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    const err = error instanceof Error ? error : new Error(String(error));
    reportLovableError(err, { boundary: "tanstack_root_error_component" });
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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Agentes Digital | Inteligência Artificial e Automatização de Processos em Angola" },
      {
        name: "description",
        content:
          "Atenda clientes mais rápido, acompanhe cada oportunidade comercial e reduza tarefas repetitivas com inteligência artificial e automatização de processos em Angola. Peça um diagnóstico.",
      },
      {
        name: "keywords",
        content:
          "inteligencia artificial empresas angola, automatizacao de processos empresariais luanda, atendimento whatsapp empresas angola, organizacao comercial crm angola, agentes digital",
      },
      { name: "author", content: "Agentes Digital" },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "geo.region", content: "AO-LUA" },
      { name: "geo.placename", content: "Luanda, Angola" },
      {
        property: "og:title",
        content: "Agentes Digital | Inteligência Artificial e Automatização de Processos em Angola",
      },
      {
        property: "og:description",
        content:
          "Implementação de inteligência artificial e automatização de processos para empresas em Angola melhorarem o atendimento e reduzirem tarefas manuais.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://agentes-digital.com/" },
      { property: "og:site_name", content: "Agentes Digital" },
      { property: "og:locale", content: "pt_AO" },
      { property: "og:image", content: "https://agentes-digital.com/favicon-512.png" },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      {
        property: "og:image:alt",
        content: "Agentes Digital - Inteligência Artificial e Automatização de Processos em Angola",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Agentes Digital | Inteligência Artificial e Automatização de Processos em Angola",
      },
      {
        name: "twitter:description",
        content:
          "Soluções de inteligência artificial e automatização de processos para empresas em Angola.",
      },
      { name: "twitter:image", content: "https://agentes-digital.com/favicon-512.png" },
      { name: "twitter:site", content: "@AgentesDigital" },
      { name: "theme-color", content: "#F5F3EE" },
    ],
    links: [
      { rel: "canonical", href: "https://agentes-digital.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#F36B32] focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-[#101D35] focus:outline-none focus:ring-2 focus:ring-[#F36B32] focus:ring-offset-2 focus:ring-offset-[#F5F3EE]"
        >
          Saltar para o conteúdo principal
        </a>
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
      <TooltipProvider delayDuration={150}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

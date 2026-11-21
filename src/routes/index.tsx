import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { Benefits } from "@/components/site/Benefits";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { AIAgent } from "@/components/site/AIAgent";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { faqSchema, homeBreadcrumbSchema } from "@/lib/seo-schemas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Agentes Digital | Recepção Digital e IA para Espaços em Angola",
      },
      {
        name: "description",
        content:
          "Para donos e gestores de espaços de estética em Angola: implementamos uma recepção digital no WhatsApp ligada à sua agenda para atender e registar marcações.",
      },
      {
        name: "keywords",
        content:
          "recepcao digital estetica angola, marcacoes whatsapp estetica luanda, implementacao ia empresas angola, agenda espaco estetica angola, agentes digital",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        property: "og:title",
        content: "Agentes Digital | Recepção Digital e IA para Espaços em Angola",
      },
      {
        property: "og:description",
        content:
          "A sua recepção continua a atender pelo WhatsApp, mesmo quando a equipa está ocupada. Ligada à agenda real do seu espaço de estética em Angola.",
      },
      { property: "og:url", content: "https://agentes-digital.com/" },
      {
        name: "twitter:title",
        content: "Agentes Digital | Recepção Digital e IA para Espaços em Angola",
      },
      {
        name: "twitter:description",
        content:
          "Organize o atendimento e as marcações pelo WhatsApp do seu espaço de estética em Angola.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://agentes-digital.com/" },
      { rel: "alternate", hrefLang: "pt-AO", href: "https://agentes-digital.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://agentes-digital.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(homeBreadcrumbSchema),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-[#F5F3EE] text-[#101D35] antialiased selection:bg-[#F4C542] selection:text-[#101D35]">
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <Benefits />
        <Services />
        <Process />
        <AIAgent />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

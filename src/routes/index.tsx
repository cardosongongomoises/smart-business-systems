import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { Services } from "@/components/site/Services";
import { Benefits } from "@/components/site/Benefits";
import { AIAgent } from "@/components/site/AIAgent";
import { Process } from "@/components/site/Process";
import { AutomateProSection } from "@/components/site/automate-pro/AutomateProSection";
import { Pricing } from "@/components/site/Pricing";
import { Comparison } from "@/components/site/Comparison";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-[#F5F3EE] text-[#101D35] antialiased selection:bg-[#F4C542] selection:text-[#101D35]">
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <Services />
        <Benefits />
        <AIAgent />
        <Process />
        <AutomateProSection />
        <Pricing />
        <Comparison />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

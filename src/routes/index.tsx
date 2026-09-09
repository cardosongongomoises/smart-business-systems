import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { Journey } from "@/components/site/Journey";
import { Services } from "@/components/site/Services";
import { AIAgent } from "@/components/site/AIAgent";
import { Channels } from "@/components/site/Channels";
import { Process } from "@/components/site/Process";
import { LiveDemo } from "@/components/site/LiveDemo";
import { Pricing } from "@/components/site/Pricing";
import { Comparison } from "@/components/site/Comparison";
import { RoiCalculator } from "@/components/site/RoiCalculator";
import { HumanControl } from "@/components/site/HumanControl";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Journey />
        <Services />
        <AIAgent />
        <Channels />
        <LiveDemo />
        <Process />
        <Pricing />
        <Comparison />
        <RoiCalculator />
        <HumanControl />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

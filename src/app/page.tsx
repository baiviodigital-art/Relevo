import { Hero } from "@/components/home/Hero";
import { ValueProp } from "@/components/home/ValueProp";
import { ServicesRail } from "@/components/home/ServicesRail";
import { HowItWorks } from "@/components/home/HowItWorks";
import { RemoteSection } from "@/components/home/RemoteSection";
import { PackSection } from "@/components/home/PackSection";
import { Coverage } from "@/components/home/Coverage";
import { ProsSection } from "@/components/home/ProsSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProp />
      <ServicesRail />
      <HowItWorks />
      <RemoteSection />
      <PackSection />
      <Coverage />
      <ProsSection />
      <FinalCta />
    </>
  );
}

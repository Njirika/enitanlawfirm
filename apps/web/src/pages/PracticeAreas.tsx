import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Building2, Shield, Landmark } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PRACTICE_AREAS = [
  {
    id: "commercial",
    title: "Commercial Law & Corporate Practice",
    icon: Building2,
    image: "/images/practice-commercial.png",
    intro: "Deep expertise in corporate finance transactions serving local, international, and multinational corporations.",
    highlights: [
      "Legal advisory for banking and financing",
      "Infrastructure and project finance",
      "Asset finance and refinancing",
      "Specialist drafting and negotiating of complex contracts",
      "Regulatory compliance and corporate governance"
    ]
  },
  {
    id: "litigation",
    title: "Civil Litigation",
    icon: Shield,
    image: "/images/practice-litigation.png",
    intro: "Prosecuting and defending litigation in courts and tribunals across Nigeria with a focus on resolving disputes efficiently.",
    highlights: [
      "Business and commercial dispute resolution",
      "Appellate practice and representation",
      "Alternative Dispute Resolution (ADR)",
      "Clarifying commercial law frontiers in Nigeria",
      "Strategic litigation planning with minimum expenditure of resources"
    ]
  },
  {
    id: "real-estate",
    title: "Property & Real Estate Consultancy",
    icon: Landmark,
    image: "/images/practice-real-estate.png",
    intro: "Comprehensive legal services covering every aspect of the real estate lifecycle with a holistic approach.",
    highlights: [
      "Property acquisition and disposition",
      "Real estate development and construction",
      "Financing and leasing agreements",
      "Property management and operations",
      "Title conveyancing and perfection"
    ]
  }
];

export default function PracticeAreas() {
  const [activeTab, setActiveTab] = useState(PRACTICE_AREAS[0].id);

  const activeArea = PRACTICE_AREAS.find(area => area.id === activeTab) || PRACTICE_AREAS[0];

  return (
    <div className="w-full pt-24 pb-16 min-h-screen bg-background">
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">
            Practice Areas
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            World-class legal expertise tailored to resolve complex problems. 
            We also offer specialized expertise in <span className="text-secondary font-medium">Oil & Gas</span>, <span className="text-secondary font-medium">Maritime</span>, and <span className="text-secondary font-medium">Banking & Insurance</span>.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8">
        
        {/* Mobile Accordion */}
        <div className="block lg:hidden">
          <Accordion type="single" collapsible defaultValue="commercial" className="w-full">
            {PRACTICE_AREAS.map((area) => (
              <AccordionItem key={area.id} value={area.id} className="border-border">
                <AccordionTrigger className="text-xl font-serif font-bold text-primary hover:text-secondary data-[state=open]:text-secondary">
                  <div className="flex items-center text-left">
                    <area.icon className="w-5 h-5 mr-3 shrink-0" />
                    {area.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 pb-6 space-y-6">
                    <img 
                      src={area.image} 
                      alt={area.title} 
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {area.intro}
                    </p>
                    <ul className="space-y-3">
                      {area.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" />
                          <span className="text-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Desktop Vertical Tabs */}
        <div className="hidden lg:grid grid-cols-12 gap-12">
          <div className="col-span-4 flex flex-col space-y-3 relative">
            {/* Vertical line indicator background */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border -z-10" />
            
            {PRACTICE_AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveTab(area.id)}
                className={`flex items-center text-left p-5 rounded-r-xl rounded-l-sm transition-all duration-300 relative border-l-2 ${
                  activeTab === area.id 
                    ? "bg-muted border-secondary shadow-sm" 
                    : "border-transparent hover:bg-muted/50 hover:border-border"
                }`}
              >
                <area.icon className={`w-6 h-6 mr-4 shrink-0 transition-colors ${
                  activeTab === area.id ? "text-secondary" : "text-muted-foreground"
                }`} />
                <span className={`text-lg font-serif font-bold transition-colors ${
                  activeTab === area.id ? "text-primary" : "text-muted-foreground"
                }`}>
                  {area.title}
                </span>
              </button>
            ))}
          </div>

          <div className="col-span-8 bg-background rounded-2xl border border-border shadow-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="h-[300px] w-full relative">
                  <img 
                    src={activeArea.image} 
                    alt={activeArea.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <activeArea.icon className="w-10 h-10 text-secondary mb-4" />
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">{activeArea.title}</h2>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex-grow bg-background">
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {activeArea.intro}
                  </p>
                  
                  <div className="bg-muted/30 p-8 rounded-xl border border-border/50">
                    <h3 className="text-lg font-bold text-primary mb-6 uppercase tracking-wider text-sm">Key Focus Areas</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeArea.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" />
                          <span className="text-foreground leading-snug">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

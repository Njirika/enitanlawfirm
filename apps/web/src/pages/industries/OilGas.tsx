import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplet, Shield, Globe, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function OilGas() {
  return (
    <div className="w-full pb-16">
      {/* Hero */}
      <section className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-commercial.png"
            alt="Oil & Gas Legal Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
            <Droplet className="w-4 h-4 text-secondary" />
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Industry Expertise</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Oil & Gas
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Expert legal counsel for Nigeria's most dynamic and high-stakes sector — from upstream exploration to downstream distribution.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Navigating Nigeria's Energy Landscape
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Nigeria's oil and gas sector is the backbone of the national economy, governed by a complex web of legislation, regulatory frameworks, and international agreements. Enitan Afolabi & Company has developed significant expertise in advising clients across this sector.
                </p>
                <p>
                  The Petroleum Industry Act (PIA) 2021 has fundamentally reshaped the regulatory landscape, creating new opportunities and obligations for operators, investors, and host communities alike. Our team guides clients through this evolving framework with clarity and precision.
                </p>
                <p>
                  From licensing and regulatory compliance to joint venture agreements and dispute resolution, we provide the strategic legal support that clients in the oil and gas sector require to protect their interests and achieve their commercial objectives.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { icon: FileText, title: "Licensing & Permits", desc: "Guidance on petroleum prospecting licences, oil mining leases, and all regulatory approvals." },
                { icon: Shield, title: "Regulatory Compliance", desc: "Advising on compliance with NUPRC, DPR, and other regulatory body requirements." },
                { icon: Globe, title: "Joint Ventures & PSAs", desc: "Drafting and reviewing joint venture agreements and production sharing arrangements." },
                { icon: Droplet, title: "Environmental & Host Communities", desc: "Legal support on environmental obligations and host community development agreements." },
              ].map((item) => (
                <div key={item.title} className="bg-muted/50 p-6 rounded-xl border border-border">
                  <item.icon className="w-8 h-8 text-secondary mb-3" />
                  <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Discuss Your Oil & Gas Matter?</h2>
          <p className="text-white/80 text-lg mb-8">Contact our team to schedule a confidential consultation with one of our energy law specialists.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-0 px-8">
                Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/practice-areas">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary px-8">
                All Practice Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

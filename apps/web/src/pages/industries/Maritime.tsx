import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Anchor, Shield, FileText, Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function Maritime() {
  return (
    <div className="w-full pb-16">
      {/* Hero */}
      <section className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-litigation.png"
            alt="Maritime Legal Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
            <Anchor className="w-4 h-4 text-secondary" />
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Industry Expertise</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Maritime
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Comprehensive maritime legal services covering admiralty law, shipping, vessel arrests, and cargo claims across Nigerian waters.
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
                Expertise on Nigeria's Blue Waters
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Nigeria's position as a major Atlantic maritime nation — with its extensive coastline, the busy ports of Lagos and Apapa, and significant offshore oil and gas activities — makes maritime law a critical area of practice. Olamide Oluwasegun Afolabi leads our maritime practice with specialized expertise in this complex field.
                </p>
                <p>
                  Our maritime practice covers the full spectrum of admiralty matters governed by the Admiralty Jurisdiction Act 1991, the Merchant Shipping Act 2007, and applicable international maritime conventions to which Nigeria is a signatory.
                </p>
                <p>
                  We represent vessel owners, cargo interests, charterers, port operators, and insurers in disputes, regulatory matters, and transactional work — always with the precision and persuasive advocacy that complex maritime matters demand.
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
                { icon: Scale, title: "Vessel Arrests", desc: "Applications for arrest of vessels to secure maritime claims before the Federal High Court." },
                { icon: FileText, title: "Cargo Claims", desc: "Representing cargo interests and carriers in claims for damaged, lost, or delayed cargo." },
                { icon: Shield, title: "Admiralty Disputes", desc: "Full representation in admiralty proceedings including collision, salvage, and limitation claims." },
                { icon: Anchor, title: "Shipping Contracts", desc: "Drafting and advising on bills of lading, charterparties, and ship management agreements." },
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Have a Maritime Legal Matter?</h2>
          <p className="text-white/80 text-lg mb-8">Speak with our maritime law specialist to explore your options and protect your interests.</p>
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

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Shield, FileText, Scale } from "lucide-react";
import { motion } from "framer-motion";

export default function BankingInsurance() {
  return (
    <div className="w-full pb-16">
      {/* Hero */}
      <section className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/practice-real-estate.png"
            alt="Banking & Insurance Legal Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-secondary" />
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Industry Expertise</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Banking & Insurance
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Strategic legal counsel for financial institutions, insurers, and their clients across Nigeria's regulated financial services landscape.
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
                Financial Services Legal Expertise
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Nigeria's financial services sector operates under a rigorous regulatory framework overseen by the Central Bank of Nigeria (CBN), the National Insurance Commission (NAICOM), and the Securities and Exchange Commission (SEC). Enitan Afolabi & Company has extensive experience advising clients navigating this landscape.
                </p>
                <p>
                  Our banking and finance practice encompasses the full range of lending transactions — from straightforward loan facilities to complex syndicated financing arrangements. We advise both lenders and borrowers on structuring, documentation, and security arrangements.
                </p>
                <p>
                  Our insurance practice covers policy drafting and review, coverage disputes, claims handling, regulatory compliance, and reinsurance arrangements. We provide clear, practical advice that helps financial institutions and their clients manage risk effectively.
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
                { icon: Scale, title: "Lending & Finance", desc: "Advising on loan facilities, syndicated lending, and complex financing structures for banks and borrowers." },
                { icon: Shield, title: "Regulatory Compliance", desc: "Guidance on CBN, NAICOM, and SEC compliance for financial institutions and regulated entities." },
                { icon: FileText, title: "Insurance Policies", desc: "Drafting, reviewing, and advising on insurance policies, claims, and coverage disputes." },
                { icon: Building2, title: "Security & Enforcement", desc: "Advice on taking, perfecting, and enforcing security over real property, assets, and shares." },
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Need Financial Services Legal Advice?</h2>
          <p className="text-white/80 text-lg mb-8">Our team is ready to provide you with expert guidance on your banking and insurance legal matters.</p>
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

import { Link } from "wouter";
import { Shield, Scale, Target, History } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full pb-16">
      {/* Header */}
      <section className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-firm.png"
            alt="Enitan Afolabi & Company"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Our Story & Legacy
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            A pillar of legal excellence in Lagos, built on a foundation of integrity and unwavering responsibility since 1996.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                About Enitan Afolabi & Co.
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Since its founding in 1996, Enitan Afolabi & Company has stood as a pillar of legal excellence in Ikeja, Lagos. Built on a foundation of integrity and unwavering responsibility, we serve a diverse clientele — from individual stakeholders to international corporations — with the dedication and strategic insight that define a truly trusted legal partner.
                </p>
                <p>
                  We pride ourselves on being a responsive firm that adapts to the shifting legal needs of the global marketplace while maintaining the personal integrity of a boutique practice.
                </p>
                <p>
                  Our firm is composed of a Head of Chambers, dedicated Associates, and a proactive support staff including a Litigation Officer and Secretary who use initiative to succeed while rendering premium services in the global marketplace.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl"
            >
              <img 
                src="/images/about-lawyers.jpg" 
                alt="Enitan Afolabi & Co. Legal Team" 
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-white p-12 rounded-2xl"
            >
              <Target className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-3xl font-serif font-bold mb-4">Our Mission</h3>
              <p className="text-white/80 text-lg leading-relaxed font-light">
                To lead the legal industry through honesty, dedication, and personal integrity. Our proactive support staff and determined lawyers use initiative to succeed while rendering premium services in the global marketplace.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-secondary text-white p-12 rounded-2xl"
            >
              <Scale className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-3xl font-serif font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-primary/80 text-lg leading-relaxed font-medium">
                To build a firm of legal practitioners who are responsive to the ever-evolving needs of our clients, delivering world-class expertise and resolving complex problems to the utmost satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
              <Shield className="w-10 h-10 text-secondary mb-4" />
              <h4 className="text-xl font-bold text-primary mb-2">Integrity</h4>
              <p className="text-muted-foreground">Upholding the highest ethical standards in every case and client interaction since 1996.</p>
            </div>
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
              <History className="w-10 h-10 text-secondary mb-4" />
              <h4 className="text-xl font-bold text-primary mb-2">Responsiveness</h4>
              <p className="text-muted-foreground">Adapting swiftly to the shifting legal needs of our clients in a dynamic global marketplace.</p>
            </div>
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm">
              <Target className="w-10 h-10 text-secondary mb-4" />
              <h4 className="text-xl font-bold text-primary mb-2">Excellence</h4>
              <p className="text-muted-foreground">Delivering world-class legal expertise and resolving complex problems to the utmost satisfaction.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

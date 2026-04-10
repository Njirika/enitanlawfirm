import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Shield, Building2, Anchor, Droplet, Landmark } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt="Law firm office interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8">
              <Scale className="w-4 h-4 text-secondary" />
              <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Established 1996 • Lagos, Nigeria</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
              A Pillar of <span className="text-secondary italic">Legal Excellence</span> <br/>in the Global Marketplace.
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-light">
              Built on a foundation of integrity and unwavering responsibility, we serve a diverse clientele — from individual stakeholders to international corporations.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/practice-areas">
                <Button size="lg" className="text-base px-8 h-14 bg-secondary hover:bg-secondary/90 text-white border-0">
                  Our Practice Areas <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-base px-8 h-14 bg-transparent border-white/30 text-white hover:bg-white hover:text-primary">
                  Consult With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-secondary/10 rounded-lg -z-10 transform rotate-2"></div>
              <img 
                src="/images/about-firm.png" 
                alt="Enitan Afolabi & Company Heritage" 
                className="w-full h-[600px] object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-lg shadow-2xl max-w-xs hidden md:block">
                <div className="text-5xl font-serif font-bold text-secondary mb-2">28+</div>
                <div className="text-lg font-medium">Years of dedicated legal service and trusted counsel.</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">Honesty. Dedication.<br/>Personal Integrity.</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Since its founding in 1996, Enitan Afolabi & Company has stood as a pillar of legal excellence in Ikeja, Lagos. 
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We pride ourselves on being a responsive firm that adapts to the shifting legal needs of the global marketplace while maintaining the personal integrity of a boutique practice. Our proactive support staff and determined lawyers use initiative to succeed while rendering premium services.
              </p>
              <Link href="/about">
                <Button variant="link" className="text-secondary hover:text-primary p-0 text-lg group">
                  Read our firm's story 
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Practice Areas */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Core Practice Areas</h2>
            <p className="text-lg text-muted-foreground">Comprehensive legal solutions tailored to navigate complex challenges and protect our clients' interests.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Commercial & Corporate",
                icon: Building2,
                image: "/images/practice-commercial.png",
                desc: "Deep expertise in corporate finance transactions, banking, refinancing, and infrastructure finance."
              },
              {
                title: "Civil Litigation",
                icon: Shield,
                image: "/images/practice-litigation.png",
                desc: "Prosecuting and defending litigation in courts and tribunals across Nigeria with minimum expenditure of time."
              },
              {
                title: "Property & Real Estate",
                icon: Landmark,
                image: "/images/practice-real-estate.png",
                desc: "Holistic legal services for acquisition, development, financing, and conveyance of real estate."
              }
            ].map((practice, index) => (
              <motion.div 
                key={practice.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={practice.image} 
                    alt={practice.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="p-8">
                  <practice.icon className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">{practice.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{practice.desc}</p>
                  <Link href={`/practice-areas`}>
                    <span className="text-secondary font-semibold hover:text-primary transition-colors flex items-center cursor-pointer">
                      Learn more <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Expertise Strip */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8 md:mb-0">Specialized Industry Expertise</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="flex items-center space-x-3">
                <Droplet className="w-8 h-8 text-secondary" />
                <span className="text-lg font-medium">Oil & Gas</span>
              </div>
              <div className="flex items-center space-x-3">
                <Anchor className="w-8 h-8 text-secondary" />
                <span className="text-lg font-medium">Maritime</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="w-8 h-8 text-secondary" />
                <span className="text-lg font-medium">Banking & Insurance</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <img src="/images/hero-bg.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-muted p-12 md:p-16 rounded-2xl text-center max-w-4xl mx-auto border border-border shadow-sm">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">Require Legal Counsel?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team of dedicated professionals is ready to provide you with the strategic insight and expert representation you need.
            </p>
            <Link href="/contact">
              <Button size="lg" className="text-lg px-10 h-14 bg-primary hover:bg-primary/90">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

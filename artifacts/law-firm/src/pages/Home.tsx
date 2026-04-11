import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Shield, Building2, Anchor, Droplet, Landmark, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { useListBlogPosts } from "@workspace/api-client-react";

export default function Home() {
  const { data: blogData } = useListBlogPosts({ page: 1, limit: 3 });

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
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
              A Pillar of <span className="text-secondary italic">Legal Excellence</span><br/>in the Global Marketplace.
            </h1>
            
            <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Built on a foundation of integrity and unwavering responsibility, we serve a diverse clientele — from individual stakeholders to international corporations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                  <Link href="/practice-areas">
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-2xl md:text-3xl font-serif font-bold">Specialized Industry Expertise</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <Link href="/industries/oil-gas">
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <Droplet className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-medium group-hover:text-secondary transition-colors underline-offset-4 group-hover:underline">Oil & Gas</span>
                </div>
              </Link>
              <Link href="/industries/maritime">
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <Anchor className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-medium group-hover:text-secondary transition-colors underline-offset-4 group-hover:underline">Maritime</span>
                </div>
              </Link>
              <Link href="/industries/banking-insurance">
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <Building2 className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-medium group-hover:text-secondary transition-colors underline-offset-4 group-hover:underline">Banking & Insurance</span>
                </div>
              </Link>
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

      {/* Blog Section */}
      {blogData && blogData.items.length > 0 && (
        <section className="py-24 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">Legal Insights & News</h2>
                <p className="text-muted-foreground text-lg">Expert commentary and analysis from our legal team.</p>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white shrink-0">
                  View All Articles <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogData.items.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border flex flex-col"
                >
                  {post.featuredImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold tracking-widest uppercase text-secondary mb-3">{post.category}</span>
                    <h3 className="text-xl font-serif font-bold text-primary mb-3 leading-snug group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="mt-4 text-secondary font-semibold hover:text-primary transition-colors flex items-center text-sm cursor-pointer">
                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

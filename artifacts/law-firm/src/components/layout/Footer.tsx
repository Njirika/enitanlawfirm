import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Enitan Afolabi & Co. Logo"
                className="w-10 h-10 object-contain flex-shrink-0 brightness-0 invert opacity-90"
              />
              <h3 className="text-2xl font-serif font-bold">Enitan Afolabi & Co.</h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              A pillar of legal excellence in Lagos since 1996, serving individual stakeholders to international corporations with integrity and strategic insight.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Our Team", "Careers", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}>
                    <div className="text-primary-foreground/80 hover:text-white transition-colors cursor-pointer inline-block">
                      {item}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-secondary">Practice Areas</h4>
            <ul className="space-y-3">
              {["Commercial Law & Corporate Practice", "Civil Litigation", "Property & Real Estate"].map((item) => (
                <li key={item}>
                  <Link href="/practice-areas">
                    <div className="text-primary-foreground/80 hover:text-white transition-colors cursor-pointer inline-block">
                      {item}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-secondary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-secondary" />
                <span>1st Floor, Chemline House, No 7, Obasa road, off Oba Akran Avenue, Ikeja, Lagos-State</span>
              </li>
              <li className="flex items-center space-x-3 text-primary-foreground/80">
                <Phone className="w-5 h-5 shrink-0 text-secondary" />
                <span>+2348119480206</span>
              </li>
              <li className="flex items-center space-x-3 text-primary-foreground/80">
                <Mail className="w-5 h-5 shrink-0 text-secondary" />
                <span>info@enitanafolabiandco.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Enitan Afolabi & Company. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/admin/login">
              <div className="hover:text-white transition-colors cursor-pointer inline-block">Staff Login</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

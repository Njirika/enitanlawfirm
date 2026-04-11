import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const TEAM_MEMBERS = [
  {
    id: "enitan",
    name: "Enitan Godwin Afolabi, Esq.",
    role: "Principal Partner & Consultant",
    callToBar: "1986",
    image: "/images/team-enitan.jpg",
    summary: "Over four decades of experience. Alumnus of Obafemi Awolowo University. Started at Directorate of Public Prosecutions.",
    fullBio: "Enitan Godwin Afolabi brings over four decades of unparalleled legal expertise to the firm. An alumnus of the prestigious University of Ife (now Obafemi Awolowo University), his career began at the Directorate of Public Prosecutions, Ministry of Justice. He subsequently held senior roles at Fola Akinrinsola & Co. and S.O. Ige & Co., honing his skills in complex litigation and corporate advisory. His distinguished career also includes serving as Corporate Director at Olanibi Papa Ajao Community Bank. As Principal Partner, he provides strategic direction and consulting across all practice areas, ensuring the firm's legacy of excellence continues."
  },
  {
    id: "francis",
    name: "Francis Afeakuye Izuagie",
    role: "Senior Associate",
    callToBar: "2001",
    image: "/images/team-francis.jpg",
    summary: "Joined firm in 2008, leads civil litigation department. Known for precision and a highly persuasive advocacy style.",
    fullBio: "Francis Afeakuye Izuagie is a Senior Associate who has been an integral part of the firm since 2008. A graduate of Ambrose Alli University, he was called to the Nigerian Bar in 2001. He currently leads the firm's civil litigation department, bringing a reputation for meticulous precision and a highly persuasive advocacy style. Before joining Enitan Afolabi & Co., he gained extensive experience at Kayode Adaramoye & Associates and Chief O.O. Ajala & Co. His deep understanding of courtroom dynamics and strategic dispute resolution makes him a formidable advocate for our clients."
  },
  {
    id: "olamide",
    name: "Olamide Oluwasegun Afolabi",
    role: "Senior Associate",
    callToBar: "2024",
    image: "/images/team-3.png",
    summary: "Specialization in Maritime Law. Fellow of Institute of Chartered Mediators and Conciliators.",
    fullBio: "Olamide Oluwasegun Afolabi is a dynamic Senior Associate with a specialized focus on Maritime Law. He earned his LL.B from Houdegbe North American University (2015) and Crescent University, Abeokuta (2019), before his call to the Bar in 2024. Prior to his current role, he practiced at Jean Chiazor & Partners. Olamide is distinguished not only by his maritime expertise but also his commitment to alternative dispute resolution—he is a Member of the Institute of Construction Arbitrators and a Fellow of the Institute of Chartered Mediators and Conciliators. He brings fresh, innovative legal strategies to complex commercial matters."
  }
];

export default function OurTeam() {
  const [selectedMember, setSelectedMember] = useState<typeof TEAM_MEMBERS[0] | null>(null);

  return (
    <div className="w-full pt-24 pb-16 min-h-screen bg-background">
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">
            Our Team
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            A dedicated team of legal professionals committed to delivering world-class expertise and resolving complex problems to your utmost satisfaction.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="space-y-12">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="md:w-2/5 lg:w-1/3 h-[400px] md:h-auto shrink-0 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center flex-grow">
                <div className="mb-2 inline-block px-3 py-1 bg-muted rounded-full text-sm font-medium text-muted-foreground w-max">
                  Called to Bar: {member.callToBar}
                </div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-2">{member.name}</h2>
                <h3 className="text-xl text-secondary font-medium mb-6">{member.role}</h3>
                
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {member.summary}
                </p>
                
                <div className="mt-auto">
                  <Button 
                    onClick={() => setSelectedMember(member)}
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View Full Bio
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Support Staff Note */}
      <section className="py-16 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">Our Proactive Support Staff</h3>
          <p className="text-muted-foreground text-lg">
            Our lawyers are supported by a dedicated team including a Litigation Officer and Secretary who ensure the seamless operation of our firm and timely service delivery to our clients.
          </p>
        </div>
      </section>

      {/* Bio Modal */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-background border-border">
          {selectedMember && (
            <div className="flex flex-col md:flex-row h-full max-h-[80vh]">
              <div className="w-full md:w-1/3 h-48 md:h-auto shrink-0 relative">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 flex flex-col min-h-0">
                <DialogHeader className="p-6 md:p-8 pb-0 text-left border-b border-border/50 bg-muted/20">
                  <DialogTitle className="text-2xl font-serif font-bold text-primary">
                    {selectedMember.name}
                  </DialogTitle>
                  <DialogDescription className="text-secondary font-medium text-lg mt-1">
                    {selectedMember.role}
                  </DialogDescription>
                  <div className="text-sm text-muted-foreground mt-2 mb-4">
                    Year called to Bar: {selectedMember.callToBar}
                  </div>
                </DialogHeader>
                <ScrollArea className="flex-1 p-6 md:p-8">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                    {selectedMember.fullBio}
                  </p>
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

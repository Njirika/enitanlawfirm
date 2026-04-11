import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useSubmitCareerApplication } from "@workspace/api-client-react";
import { Briefcase, GraduationCap, Users, HeartHandshake } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  position: z.string().optional(),
  coverNote: z.string().min(10, "Please provide a brief cover note"),
  cvUrl: z.string().url("Please provide a valid URL to your CV/LinkedIn").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export default function Careers() {
  const { toast } = useToast();
  const submitApplication = useSubmitCareerApplication();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      coverNote: "",
      cvUrl: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    submitApplication.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Application Submitted",
            description: "Thank you for your interest. We will review your application and contact you soon.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error submitting your application. Please try again later.",
          });
        }
      }
    );
  };

  return (
    <div className="w-full pb-16 min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/careers-hero.png"
            alt="Careers at Enitan Afolabi & Company"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Join Our Team</h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Build your legal career at a firm that values integrity, dedication, and excellence in the global marketplace.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="h-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Culture & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="rounded-2xl overflow-hidden h-[300px] shadow-lg">
              <img 
                src="/images/careers-hero.png" 
                alt="Law firm office environment" 
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Life at Enitan Afolabi & Co.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We are a responsive boutique practice composed of a Head of Chambers, dedicated Associates, and proactive support staff. We pride ourselves on adapting to the shifting legal needs of the global marketplace while maintaining personal integrity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/50 rounded-xl border border-border">
                  <GraduationCap className="w-8 h-8 text-secondary mb-3" />
                  <h4 className="font-bold text-primary mb-2">Continuous Growth</h4>
                  <p className="text-sm text-muted-foreground">Mentorship from senior partners and exposure to complex, high-stakes matters.</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl border border-border">
                  <HeartHandshake className="w-8 h-8 text-secondary mb-3" />
                  <h4 className="font-bold text-primary mb-2">Boutique Culture</h4>
                  <p className="text-sm text-muted-foreground">A close-knit, supportive environment where your initiative is recognized and rewarded.</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl border border-border">
                  <Briefcase className="w-8 h-8 text-secondary mb-3" />
                  <h4 className="font-bold text-primary mb-2">Diverse Practice</h4>
                  <p className="text-sm text-muted-foreground">Work across Commercial Law, Civil Litigation, Real Estate, Maritime, and Oil & Gas.</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl border border-border">
                  <Users className="w-8 h-8 text-secondary mb-3" />
                  <h4 className="font-bold text-primary mb-2">Collaborative Teams</h4>
                  <p className="text-sm text-muted-foreground">Proactive support staff and lawyers working together to deliver premium services.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Application Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-8 md:p-10 rounded-2xl border border-border shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-secondary" />
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">Submit Your Application</h3>
            <p className="text-muted-foreground mb-8">We are always looking for exceptional talent to join our practice.</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">Full Name <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-medium">Email Address <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jane@example.com" className="bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+234 XXX XXXX" className="bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">Position of Interest</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior Associate, Litigation Officer" className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">Link to CV / LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://linkedin.com/in/janedoe" className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverNote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">Cover Note <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly tell us why you'd be a great fit for Enitan Afolabi & Co." 
                          className="min-h-[120px] bg-background resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                  disabled={submitApplication.isPending}
                  data-testid="button-submit-career"
                >
                  {submitApplication.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

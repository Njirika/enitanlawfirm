import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetAdminMe, useUpdateAdminMe } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, Mail, User } from "lucide-react";
import { useEffect } from "react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { data: admin, isLoading } = useGetAdminMe();
  const updateMutation = useUpdateAdminMe();
  const { toast } = useToast();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (admin) {
      form.reset({
        name: admin.name,
        email: admin.email,
        password: "",
      });
    }
  }, [admin, form]);

  const onSubmit = (data: ProfileValues) => {
    const updateData: any = {
      name: data.name,
      email: data.email,
    };
    if (data.password) {
      updateData.password = data.password;
    }

    updateMutation.mutate(
      { data: updateData },
      {
        onSuccess: () => {
          toast({ title: "Profile updated successfully" });
          form.setValue("password", "");
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: "Update failed",
            description: error.response?.data?.error || "An error occurred while updating your profile.",
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-1">Account Settings</h1>
        <p className="text-muted-foreground">Manage your administrative credentials and profile information.</p>
      </div>

      <Card className="border-border shadow-md overflow-hidden bg-card">
        <CardHeader className="bg-muted/30 border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Admin Profile
          </CardTitle>
          <CardDescription>Update your name, email, and password used for the Staff Portal.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@enitanafolabiandco.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This email is used for logging into the admin dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 border-t border-border">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Change Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Leave blank to keep current password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Minimum 8 characters. Leave blank if you don't want to change it.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  className="px-8" 
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

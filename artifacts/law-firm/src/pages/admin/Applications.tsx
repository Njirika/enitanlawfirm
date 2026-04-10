import { useState } from "react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListCareerApplications, 
  useUpdateCareerApplication,
  getListCareerApplicationsQueryKey,
  CareerApplication,
  UpdateCareerApplicationInputStatus
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Clock, ExternalLink, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Applications() {
  const [page, setPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateMutation = useUpdateCareerApplication();

  const { data, isLoading } = useListCareerApplications({ page, limit: 20 });

  const handleUpdateStatus = (id: number, status: UpdateCareerApplicationInputStatus) => {
    updateMutation.mutate(
      { id, data: { status } },
      {
        onSuccess: (updated) => {
          queryClient.setQueryData(
            getListCareerApplicationsQueryKey({ page, limit: 20 }), 
            (old: any) => {
              if (!old) return old;
              return {
                ...old,
                items: old.items.map((item: any) => item.id === id ? updated : item)
              };
            }
          );
          if (selectedApp?.id === id) {
            setSelectedApp(updated);
          }
          toast({ title: "Status updated" });
        }
      }
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">New</Badge>;
      case "reviewing":
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Reviewing</Badge>;
      case "shortlisted":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Shortlisted</Badge>;
      case "rejected":
        return <Badge variant="outline" className="text-muted-foreground">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-1">Career Applications</h1>
          <p className="text-muted-foreground">Review and manage job applicants.</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading applications...</div>
        ) : data?.items.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No applications found.</div>
        ) : (
          <div className="divide-y divide-border">
            {data?.items.map((app) => (
              <div 
                key={app.id} 
                className={`p-4 md:p-6 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col md:flex-row gap-4 md:items-center justify-between ${app.status === 'new' ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                onClick={() => {
                  setSelectedApp(app);
                  if (app.status === 'new') {
                    handleUpdateStatus(app.id, "reviewing");
                  }
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground truncate">{app.fullName}</span>
                    {getStatusBadge(app.status)}
                  </div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {app.position || "General Application"}
                  </h4>
                </div>
                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {format(new Date(app.createdAt), 'MMM d, yyyy')}
                  </span>
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <Select 
                      value={app.status} 
                      onValueChange={(v: UpdateCareerApplicationInputStatus) => handleUpdateStatus(app.id, v)}
                    >
                      <SelectTrigger className="h-8 w-[120px] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <DialogContent className="max-w-2xl bg-card border-border h-[80vh] flex flex-col">
          {selectedApp && (
            <>
              <DialogHeader className="border-b border-border pb-4 shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-xl font-bold flex items-center">
                    {selectedApp.fullName}
                  </DialogTitle>
                  {getStatusBadge(selectedApp.status)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground mb-2">
                  <span className="font-medium text-foreground flex items-center">
                    <Briefcase className="w-4 h-4 mr-1.5" /> 
                    {selectedApp.position || "General Application"}
                  </span>
                  <span className="flex items-center"><Mail className="w-4 h-4 mr-1.5" /> <a href={`mailto:${selectedApp.email}`} className="hover:text-primary underline">{selectedApp.email}</a></span>
                  {selectedApp.phone && (
                    <span className="flex items-center"><Phone className="w-4 h-4 mr-1.5" /> <a href={`tel:${selectedApp.phone}`} className="hover:text-primary underline">{selectedApp.phone}</a></span>
                  )}
                </div>
                {selectedApp.cvUrl && (
                  <div className="mt-2">
                    <a href={selectedApp.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4 mr-1" /> View CV / Portfolio
                    </a>
                  </div>
                )}
              </DialogHeader>
              
              <ScrollArea className="flex-1 p-1">
                <div className="space-y-4 pt-4 pb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Cover Note</h4>
                  <div className="whitespace-pre-wrap text-foreground/90 bg-muted/30 p-6 rounded-xl border border-border">
                    {selectedApp.coverNote}
                  </div>
                </div>
              </ScrollArea>

              <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4 shrink-0">
                <Select 
                  value={selectedApp.status} 
                  onValueChange={(v: UpdateCareerApplicationInputStatus) => handleUpdateStatus(selectedApp.id, v)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedApp(null)}
                >
                  Close
                </Button>
                <Button asChild>
                  <a href={`mailto:${selectedApp.email}?subject=Regarding your application to Enitan Afolabi & Co.`}>
                    Email Applicant
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

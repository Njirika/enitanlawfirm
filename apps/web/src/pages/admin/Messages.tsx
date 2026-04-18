import { useState } from "react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListContactMessages, 
  useUpdateContactMessage,
  getListContactMessagesQueryKey,
  ContactMessage,
  UpdateContactMessageInputStatus
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Clock, Search, Filter } from "lucide-react";
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

export default function Messages() {
  const [page, setPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateMutation = useUpdateContactMessage();

  const { data, isLoading } = useListContactMessages({ page, limit: 20 });

  const handleUpdateStatus = (id: number, status: UpdateContactMessageInputStatus) => {
    updateMutation.mutate(
      { id, data: { status } },
      {
        onSuccess: (updated) => {
          queryClient.setQueryData(
            getListContactMessagesQueryKey({ page, limit: 20 }), 
            (old: any) => {
              if (!old) return old;
              return {
                ...old,
                items: old.items.map((item: any) => item.id === id ? updated : item)
              };
            }
          );
          if (selectedMessage?.id === id) {
            setSelectedMessage(updated);
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
      case "read":
        return <Badge variant="secondary">Read</Badge>;
      case "replied":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Replied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-1">Contact Messages</h1>
          <p className="text-muted-foreground">Manage inquiries from potential clients.</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading messages...</div>
        ) : data?.items.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No messages found.</div>
        ) : (
          <div className="divide-y divide-border">
            {data?.items.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-4 md:p-6 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col md:flex-row gap-4 md:items-center justify-between ${msg.status === 'new' ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (msg.status === 'new') {
                    handleUpdateStatus(msg.id, "read");
                  }
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground truncate">{msg.fullName}</span>
                    {getStatusBadge(msg.status)}
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1 truncate">{msg.subject}</h4>
                  <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                </div>
                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {format(new Date(msg.createdAt), 'MMM d, yyyy HH:mm')}
                  </span>
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <Select 
                      value={msg.status} 
                      onValueChange={(v: UpdateContactMessageInputStatus) => handleUpdateStatus(msg.id, v)}
                    >
                      <SelectTrigger className="h-8 w-[110px] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedMessage && (
            <>
              <DialogHeader className="border-b border-border pb-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-xl font-bold">{selectedMessage.subject}</DialogTitle>
                  {getStatusBadge(selectedMessage.status)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{selectedMessage.fullName}</span>
                  <span className="flex items-center"><Mail className="w-4 h-4 mr-1.5" /> <a href={`mailto:${selectedMessage.email}`} className="hover:text-primary underline">{selectedMessage.email}</a></span>
                  {selectedMessage.phone && (
                    <span className="flex items-center"><Phone className="w-4 h-4 mr-1.5" /> <a href={`tel:${selectedMessage.phone}`} className="hover:text-primary underline">{selectedMessage.phone}</a></span>
                  )}
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {format(new Date(selectedMessage.createdAt), 'PPP p')}</span>
                </div>
              </DialogHeader>
              
              <div className="min-h-[200px] whitespace-pre-wrap text-foreground/90 bg-muted/30 p-6 rounded-xl border border-border">
                {selectedMessage.message}
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-border pt-4">
                <Select 
                  value={selectedMessage.status} 
                  onValueChange={(v: UpdateContactMessageInputStatus) => handleUpdateStatus(selectedMessage.id, v)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Mark as New</SelectItem>
                    <SelectItem value="read">Mark as Read</SelectItem>
                    <SelectItem value="replied">Mark as Replied</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
                <Button asChild>
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                    Reply via Email
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

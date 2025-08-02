"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface Registration {
  id: string;
  fullName: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  address: string;
  phoneNumber: string;
  parentName: string;
  parentPhone: string;
  parentAddress: string;
  educationLevel: string;
  schoolName: string;
  schoolAddress: string;
  graduationYear?: number;
  motivation: string;
  healthCondition?: string;
  specialNeeds?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  processedBy?: string;
  processedAt?: string;
  createdAt: string;
  processedByUser?: {
    name: string;
    email: string;
  };
}

interface RegistrationDialogProps {
  registration: Registration;
  onStatusUpdate: (registrationId: string, status: 'APPROVED' | 'REJECTED', notes?: string) => Promise<void>;
  processing: boolean;
}

export default function RegistrationDialog({ 
  registration, 
  onStatusUpdate, 
  processing 
}: RegistrationDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const handleStatusUpdate = async (status: 'APPROVED' | 'REJECTED') => {
    await onStatusUpdate(registration.id, status, notes);
    setDialogOpen(false);
    setNotes("");
  };

  const resetDialog = () => {
    setNotes("");
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => {
      if (!open) {
        resetDialog();
      }
      setDialogOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          Proses
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Proses Pendaftaran - {registration.fullName}</DialogTitle>
          <DialogDescription>
            Setujui atau tolak pendaftaran ini
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Catatan (Opsional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tambahkan catatan untuk pendaftar..."
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetDialog}
            disabled={processing}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleStatusUpdate('REJECTED')}
            disabled={processing}
          >
            {processing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4 mr-2" />
            )}
            Tolak
          </Button>
          <Button
            onClick={() => handleStatusUpdate('APPROVED')}
            disabled={processing}
          >
            {processing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Setujui
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
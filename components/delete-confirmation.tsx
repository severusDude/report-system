import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UseDeleteConfirmationOptions<T> {
  isSilent?: boolean;
  title: string;
  description: string;
  action: (params: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseDeleteConfirmationReturn<T> {
  trigger: (params: T) => void;
  isPending: boolean;
  dialog: React.ReactNode;
}

export function useDeleteConfirmation<T>({
  isSilent = false,
  title,
  description,
  action,
  onSuccess,
  onError,
}: UseDeleteConfirmationOptions<T>): UseDeleteConfirmationReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [pendingParams, setPendingParams] = useState<T | null>(null);

  const executeAction = async (params: T) => {
    setIsPending(true);
    try {
      await action(params);
      onSuccess?.();
      setIsOpen(false);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsPending(false);
      setPendingParams(null);
    }
  };

  const trigger = (params: T) => {
    if (isSilent) {
      executeAction(params);
    } else {
      setPendingParams(params);
      setIsOpen(true);
    }
  };

  const handleConfirm = () => {
    if (pendingParams) {
      executeAction(pendingParams);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setPendingParams(null);
  };

  const dialog = !isSilent ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null;

  return {
    trigger,
    isPending,
    dialog,
  };
}

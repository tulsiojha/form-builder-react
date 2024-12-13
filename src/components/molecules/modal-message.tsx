import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

const MessageModal = ({
  children,
  open,
  setOpen,
}: {
  children?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Form data</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;

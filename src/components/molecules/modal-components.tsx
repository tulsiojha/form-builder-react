import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { components } from "@/utils/data";
import { IItem } from "@/utils/types";

const ComponentModal = ({
  onSubmit,
  children,
}: {
  onSubmit?: (item: IItem) => void;
  children?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose form input</DialogTitle>
        </DialogHeader>
        <div>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="flex flex-col gap-2">
              {components.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="h-14 border border-gray-200 rounded flex flex-row gap-2 items-center px-2 bg-white cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                      onSubmit?.(item);
                    }}
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.displayName}</span>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentModal;

"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

const MobileDrawer = ({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>View panel</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default MobileDrawer;

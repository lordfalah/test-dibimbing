import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type TFormSheet = {
  children: React.ReactNode;
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (e: boolean) => void;
  btnELement: React.ReactNode;
};

const FormSheet: React.FC<TFormSheet> = ({
  children,
  onOpenChange,
  open,
  title,
  description,
  btnELement,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{btnELement}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
            {/* Make changes to your profile here. Click save when you're done. */}
          </SheetDescription>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  );
};

export default FormSheet;

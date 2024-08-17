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
  btnELement: React.ReactNode;
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (e: boolean) => void;
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
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  );
};

export default FormSheet;

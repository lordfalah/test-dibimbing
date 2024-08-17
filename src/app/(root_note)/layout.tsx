import FormAdd from "@/components/forms/form-add";
import React from "react";

export default function NoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      id="root"
      className="relative flex min-h-dvh flex-col-reverse justify-center gap-y-14 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-black after:content-[''] md:flex-row md:justify-normal md:gap-y-20 after:md:h-0"
    >
      <aside className="flex flex-col items-center gap-y-10 px-7 pt-8 md:gap-y-20 md:border-r-2 md:border-r-black">
        <div className="static top-0 space-y-10 md:sticky md:space-y-20">
          <h3 className="text-lg font-semibold">Docket</h3>

          <FormAdd />
        </div>
      </aside>
      {children}
    </div>
  );
}

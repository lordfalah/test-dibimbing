"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetFooter } from "@/components/ui/sheet";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SchemaNote, TNoteSchema } from "@/schemas/note";
import { useForm } from "react-hook-form";
import FormSheet from "./form";
import { useRouter, useSearchParams } from "next/navigation";

const FormEdit: React.FC<{ children: React.ReactNode; data: TNoteSchema }> = ({
  children,
  data,
}) => {
  const form = useForm<TNoteSchema>({
    resolver: zodResolver(SchemaNote),
    defaultValues: {
      body: data.body || "",
      title: data.title || "",
    },
  });
  const searchParams = useSearchParams();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(values: TNoteSchema) {
    setIsOpen(false);
    try {
      if (!data.id) throw new Error("Data tidak ada");

      const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/note`, {
        method: "PUT",
        body: JSON.stringify({ ...values, id: data.id }),
      });
      const res = await req.json();
      console.log(res);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormSheet
      btnELement={children}
      title="Update Note"
      open={isOpen}
      onOpenChange={(value) => {
        if (!form.formState.isValid) {
          setIsOpen(true);
        }

        form.reset();
        setIsOpen(value);
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="xxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Input placeholder="xxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SheetFooter>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </Form>
    </FormSheet>
  );
};

export default FormEdit;

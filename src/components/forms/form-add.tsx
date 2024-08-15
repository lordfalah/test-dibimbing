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
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const FormAdd: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TNoteSchema>({
    resolver: zodResolver(SchemaNote),
    defaultValues: {
      body: "",
      title: "",
    },
  });

  async function onSubmit(values: TNoteSchema) {
    setIsOpen(false);
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/note`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const res = await req.json();
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormSheet
      btnELement={
        <div className="flex">
          <Button
            type="button"
            className="group mx-auto size-12 rounded-full p-2"
          >
            <Plus className="transition-transform ease-in group-hover:rotate-90" />
          </Button>
        </div>
      }
      title="Add Note"
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

export default FormAdd;

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
import { SchemaNote, type TNoteSchema } from "@/schemas/note";
import { useForm } from "react-hook-form";
import FormSheet from "@/components/forms/form-sheet";
import { useRouter } from "next/navigation";
import { Service } from "@/services/note";
import { useToast } from "@/components/ui/use-toast";
import { TErrorApiRoute } from "@/types/note.type";
import { isErrorApiRoute } from "@/lib/validation";

type TFormEdit = {
  children: React.ReactNode;
  data: TNoteSchema;
};

const FormEdit: React.FC<TFormEdit> = ({
  children,
  data: { body, title, id },
}) => {
  const { toast } = useToast();
  const form = useForm<TNoteSchema>({
    resolver: zodResolver(SchemaNote),
    defaultValues: {
      body: body || "",
      title: title || "",
    },
  });

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(values: TNoteSchema) {
    try {
      if (!id) throw new Error("ID not found");
      const { message, status, errors } = await Service.putNote({
        ...values,
        id,
      });
      if (errors) {
        toast({ variant: "destructive", title: status, description: message });
        Object.keys(errors).forEach((key) => {
          return form.setError(key as keyof TNoteSchema, {
            type: "server",
            message: errors[key as keyof typeof errors],
          });
        });
        return;
      }

      setIsOpen(false);
      toast({ variant: "success", title: status, description: message });
      form.reset();
      router.refresh();
    } catch (error) {
      if (isErrorApiRoute(error)) {
        const { message, status }: TErrorApiRoute = error;
        toast({
          variant: "destructive",
          title: status,
          description: message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Unexpected Error",
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  }

  const handleOnChangeSheet = (value: boolean) => {
    if (!form.formState.isValid) {
      setIsOpen(true);
    }
    form.reset();
    setIsOpen(value);
  };

  return (
    <FormSheet
      btnELement={children}
      title="Update Note"
      open={isOpen}
      onOpenChange={handleOnChangeSheet}
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
                <FormItem className="flex flex-col">
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <textarea placeholder="Type your body here." {...field} />
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

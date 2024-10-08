"use client";

import React, { Fragment, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { Plus, ArrowLeft, Loader2 } from "lucide-react";
import { Service } from "@/services/note";
import { useToast } from "@/components/ui/use-toast";
import { TErrorApiRoute } from "@/types/note.type";
import { isErrorApiRoute } from "@/lib/validation";
import Link from "next/link";

const FormAdd: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const form = useForm<TNoteSchema>({
    resolver: zodResolver(SchemaNote),
    defaultValues: {
      body: "",
      title: "",
    },
  });

  async function onSubmit(values: TNoteSchema) {
    try {
      const { errors, status, message } = await Service.postNote(values);
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

      toast({ variant: "success", title: status, description: message });
      form.reset();
      router.refresh();
      setIsOpen(false);
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
      btnELement={
        <div className="flex">
          {pathName === "/" ? (
            <Button
              type="button"
              className="group mx-auto size-12 rounded-full p-2"
            >
              <Plus className="transition-transform ease-in group-hover:rotate-90" />
            </Button>
          ) : (
            <Button
              asChild
              type="button"
              className="group mx-auto size-12 rounded-full p-2"
            >
              <Link href={"/"}>
                <ArrowLeft />
              </Link>
            </Button>
          )}
        </div>
      }
      title="Add Note"
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Fragment>
                  Please wait
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Fragment>
              ) : (
                "Save changes"
              )}
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </FormSheet>
  );
};

export default FormAdd;

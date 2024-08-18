"use client";

import React from "react";
import { Pencil, Trash, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { formatedDate } from "@/lib/utils";
import FormEdit from "@/components/forms/form-edit";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import type { Note } from "@prisma/client";
import { Service } from "@/services/note";
import { isErrorApiRoute } from "@/lib/validation";
import { TErrorApiRoute } from "@/types/note.type";

type TCardNote = {
  className?: string;
  backgroundColor?: string;
  data: Note;
};

const CardNote: React.FC<TCardNote> = ({
  data: { body, createdAt, id, title },
  className,
  backgroundColor = "bg-yellow-300",
}) => {
  const { push, refresh } = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const handleDeleteNote = async (id: string) => {
    try {
      const { errors, status, message } = await Service.deleteNote(id);
      if (errors) {
        toast({
          variant: "destructive",
          title: status,
          description: message,
        });
      } else {
        push("/");
        toast({
          variant: "success",
          title: "Delete",
          description: "Success delete note",
        });
      }
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
    } finally {
      refresh();
    }
  };

  return (
    <div className="group relative inline-block focus:outline-none focus:ring">
      <span
        className={`absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 ${backgroundColor}`}
      ></span>

      <div className="relative inline-block border-2 border-current px-8 py-3 text-sm tracking-widest text-black group-active:text-opacity-75">
        <div
          className={`flex flex-col justify-between rounded-2xl ${className}`}
        >
          <div>
            <legend className="text-right font-bold">{title}</legend>

            <p className="line-clamp-5 text-lg font-normal text-black">
              {body}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">{formatedDate(createdAt)}</p>

            <div className="flex gap-x-4">
              {params.id ? (
                <Button
                  onClick={() => handleDeleteNote(id)}
                  type="button"
                  className="group size-12 rounded-full p-2"
                >
                  <Trash />
                </Button>
              ) : (
                <Button
                  asChild
                  type="button"
                  className="group size-12 rounded-full p-2"
                >
                  <Link href={`/${id}`}>
                    <View />
                  </Link>
                </Button>
              )}

              <FormEdit data={{ body, title, id }}>
                <Button
                  type="button"
                  className="group size-12 rounded-full p-2"
                >
                  <Pencil />
                </Button>
              </FormEdit>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNote;

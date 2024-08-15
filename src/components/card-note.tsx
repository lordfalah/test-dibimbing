"use client";

import React from "react";
import { Pencil, Trash, View } from "lucide-react";
import { Button } from "./ui/button";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { formatedDate } from "@/lib/utils";
import FormEdit from "./forms/form-edit";
import Link from "next/link";
import { useToast } from "./ui/use-toast";

type TCardNote = {
  title: string;
  body: string;
  createdAt: Date;
  className?: string;
  id: string;
};

const CardNote: React.FC<TCardNote> = ({
  body,
  createdAt,
  title,
  className,
  id,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push, refresh } = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const handleDeleteNote = async (id: string) => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/note?id=${id}`,
        {
          method: "DELETE",
          cache: "no-store",
        },
      );
      const res = await req.json();

      push("/");
      toast({
        title: "Delete",
        description: "Success delete note",
      });
      return res;
    } catch (error) {
      throw new Error("INTERNAL SERVER ERROR");
    } finally {
      refresh();
    }
  };

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("note_id", value);
    } else {
      params.delete("note_id");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="group relative inline-block focus:outline-none focus:ring">
      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

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

              <FormEdit data={{ title, body, id }}>
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

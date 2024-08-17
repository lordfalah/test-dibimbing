import { TNoteSchema } from "@/schemas/note";
import { TResponse } from "@/types/note.type";
import { type Note } from "@prisma/client";

const getNotes = async (query: string): Promise<TResponse<Note[]>> => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/note?query=${query}`,
      {
        cache: "no-cache",
      },
    );
    const res = await req.json();
    return res;
  } catch (error) {
    throw new Error("INTERNAL SERVER ERROR");
  }
};

const getNote = async (params: string): Promise<TResponse<Note>> => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/note/${params}`,
      {
        cache: "no-store",
      },
    );
    const res = await req.json();
    return res;
  } catch (error) {
    throw new Error("INTERNAL SERVER ERROR");
  }
};

const postNote = async (
  payload: TNoteSchema,
): Promise<TResponse<TNoteSchema>> => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/note`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const res = await req.json();
  return res;
};

const putNote = async (
  payload: TNoteSchema,
): Promise<TResponse<TNoteSchema>> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/note/${payload.id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
  const res = await req.json();
  return res;
};

const deleteNote = async (payload: string): Promise<TResponse<Note>> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/note/${payload}`,
    {
      method: "DELETE",
    },
  );

  const res = await req.json();
  return res;
};

export const Service = { getNotes, postNote, putNote, getNote, deleteNote };

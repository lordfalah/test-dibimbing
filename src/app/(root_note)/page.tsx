import CardNote from "@/components/card-note";
import SearchNote from "@/components/search-note";
import { type TResSuccess } from "../api/note/route";
import { Fragment } from "react";
import EmptyData from "@/components/errors/empty-data";
import { Note } from "@prisma/client";

const getNotes = async (): Promise<TResSuccess<Note[]>> => {
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/note`, {
      cache: "no-cache",
    });
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("INTERNAL SERVER ERROR");
  }
};

export default async function PageNote() {
  const notes = await getNotes();

  return (
    <section>
      {notes.data.length > 0 ? (
        <article className="flex flex-col gap-y-14 px-4 py-5 sm:px-14 md:gap-y-20">
          <SearchNote />

          <div className="space-y-10 md:space-y-20">
            <Fragment>
              <h1 className="text-5xl font-medium">Notes</h1>

              <div className="overflow-y-hidden overflow-x-scroll md:overflow-hidden">
                <div className="flex size-fit gap-10 md:flex-wrap">
                  {notes.data.map(({ body, createdAt, id, title }) => (
                    <CardNote
                      id={id}
                      className={`size-72 sm:h-72 sm:w-80`}
                      key={id}
                      body={body}
                      title={title}
                      createdAt={createdAt}
                    />
                  ))}
                </div>
              </div>
            </Fragment>
          </div>
        </article>
      ) : (
        <div className="w-full py-20">
          <EmptyData title="Tidak Ada catatan" description="adsad" />
        </div>
      )}
    </section>
  );
}

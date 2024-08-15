import { TResSuccess } from "@/app/api/note/route";
import CardNote from "@/components/card-note";
import EmptyData from "@/components/errors/empty-data";
import { type Note } from "@prisma/client";

const getNote = async (params: string): Promise<TResSuccess<Note>> => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/note?id=${params}`,
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

export default async function PageDetailNote({
  params,
}: {
  params: { id: string };
}) {
  const { data, message, status } = await getNote(params.id);

  return (
    <section className="w-full">
      {data ? (
        <article className="mt-16 space-y-10 px-4 py-20 sm:px-14 md:space-y-20">
          <h1 className="text-5xl font-medium">Notes</h1>

          <CardNote
            body={data.body}
            createdAt={data.createdAt}
            id={data.id}
            title={data.title}
            className={`size-72 sm:h-72 sm:w-80`}
          />
        </article>
      ) : (
        <div className="flex h-full items-center justify-center">
          <EmptyData title="Id not found" description="" />
        </div>
      )}
    </section>
  );
}

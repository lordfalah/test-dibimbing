import CardNote from "@/components/card-note";
import EmptyData from "@/components/errors/empty-data";
import { getRandomColor } from "@/lib/utils";
import { Service } from "@/services/note";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Note App detail",
  description: "Technical Test Dibimbing",
};

export default async function PageDetailNote({
  params,
}: {
  params: { id: string };
}) {
  const { data, message, status } = await Service.getNote(params.id);

  return (
    <section className="w-full">
      {data ? (
        <article className="mt-16 space-y-10 px-4 py-20 sm:px-14 md:space-y-20">
          <h1 className="text-5xl font-medium">Note</h1>

          <CardNote
            backgroundColor={getRandomColor()}
            data={data}
            className={`size-72 sm:h-72 sm:w-80`}
          />
        </article>
      ) : (
        <div className="flex h-full items-center justify-center">
          <EmptyData title={status} description={message} />
        </div>
      )}
    </section>
  );
}

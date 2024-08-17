import CardNote from "@/components/card-note";
import SearchNote from "@/components/search-note";
import { Fragment } from "react";
import EmptyData from "@/components/errors/empty-data";
import { Service } from "@/services/note";
import { getRandomColor } from "@/lib/utils";

export default async function PageNote({
  searchParams,
}: {
  searchParams?: { query: string };
}) {
  const { data, errors, status, message } = await Service.getNotes(
    searchParams?.query || "",
  );
  return (
    <section id="notes" className="w-full">
      {data && !errors ? (
        <article className="flex flex-col gap-y-14 px-4 py-5 sm:px-14 md:gap-y-20">
          <SearchNote />
          {data.length > 0 ? (
            <div className="space-y-10 md:space-y-20">
              <Fragment>
                <h1 className="text-5xl font-medium">Notes</h1>

                <div className="overflow-y-hidden overflow-x-scroll md:overflow-hidden">
                  <div className="flex size-fit gap-10 md:flex-wrap">
                    {data.map((note) => (
                      <CardNote
                        backgroundColor={getRandomColor()}
                        className={`size-72 sm:h-72 sm:w-80`}
                        key={note.id}
                        data={note}
                      />
                    ))}
                  </div>
                </div>
              </Fragment>
            </div>
          ) : (
            <div className="w-full py-20">
              <EmptyData title="Tidak Ada catatan" description="adsad" />
            </div>
          )}
        </article>
      ) : (
        <div className="w-full py-20">
          <EmptyData title={status} description={message} />
        </div>
      )}
    </section>
  );
}

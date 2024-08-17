import CardSkeleton from "@/components/skeletons/card-skeleton";

export default function Loading() {
  return (
    <section
      id="loading-notes"
      className="space-y-10 px-4 py-5 sm:px-14 md:space-y-20"
    >
      <div className="flex rounded-md border border-blue-300 bg-[#1E293B] px-8 py-4 shadow">
        <div className="w-full animate-pulse">
          <div className="space-y-2.5">
            <div className="h-3 w-1/4 rounded bg-slate-700"></div>
            <div className="h-3 w-1/2 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>

      <h1 className="animate-pulse text-5xl font-medium">Notes</h1>

      <div className="overflow-y-hidden overflow-x-scroll md:overflow-hidden">
        <div className="flex size-fit gap-10 md:flex-wrap">
          {Array.from({ length: 10 }, (_, idx) => (
            <CardSkeleton
              key={idx}
              className="size-80 sm:h-[316px] sm:w-[388px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

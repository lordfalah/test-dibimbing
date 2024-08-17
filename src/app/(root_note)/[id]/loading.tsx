import CardSkeleton from "@/components/skeletons/card-skeleton";

export default function Loading() {
  return (
    <section
      id="loading-note-detail"
      className="space-y-10 px-4 py-5 sm:px-14 md:space-y-20"
    >
      <h1 className="mt-28 animate-pulse text-5xl font-medium">Note</h1>

      <div className="overflow-y-hidden overflow-x-scroll md:overflow-hidden">
        <div className="flex size-fit gap-10 md:flex-wrap">
          <CardSkeleton className="size-80 sm:h-[316px] sm:w-[388px]" />
        </div>
      </div>
    </section>
  );
}

import React from "react";

const CardSkeleton: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div
      className={`${className} rounded-md border border-blue-300 bg-[#1E293B] px-8 py-4 shadow`}
    >
      <div className="h-full animate-pulse">
        <div className={`flex h-full flex-col justify-between rounded-2xl`}>
          <div className="space-y-2.5">
            <legend className="ml-auto h-2 w-1/4 rounded bg-slate-700"></legend>

            <div className="h-2 w-1/2 rounded bg-slate-700"></div>
          </div>

          <div className="space-y-2.5">
            <div className="h-2 w-1/2 rounded bg-slate-700"></div>
            <div className="flex justify-between">
              <div className="h-2 w-1/4 rounded bg-slate-700"></div>
              <div className="h-2 w-1/4 rounded bg-slate-700"></div>
            </div>

            <div className="h-2 w-1/2 rounded bg-slate-700"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="h-2 w-1/4 rounded bg-slate-700"></div>

            <div className="flex gap-x-4">
              <div className="size-12 rounded-full bg-slate-700"></div>
              <div className="size-12 rounded-full bg-slate-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;

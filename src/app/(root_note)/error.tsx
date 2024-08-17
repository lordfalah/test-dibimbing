"use client"; // Error boundaries must be Client Components

import EmptyData from "@/components/errors/empty-data";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section id="error" className="mx-auto h-full w-full space-y-4">
      <EmptyData description="Error" title="Error" />
      <div className="flex w-full justify-center">
        <Button
          className=""
          type="button"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </section>
  );
}

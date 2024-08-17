import { SchemaNote } from "@/schemas/note";
import { TErrorApiRoute } from "@/types/note.type";

export function validatePayload(payload: any) {
  const validation = SchemaNote.safeParse(payload);
  if (!validation.success) {
    const errors = validation.error.issues.reduce(
      (acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );
    return { success: false, errors, data: null };
  }
  return { success: true, data: validation.data };
}

export function isErrorApiRoute(error: any): error is TErrorApiRoute {
  return (
    error &&
    typeof error.message === "string" &&
    typeof error.status === "number"
  );
}

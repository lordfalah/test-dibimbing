import { z } from "zod";

export const SchemaNote = z.object({
  title: z.string().min(3),
  body: z.string().min(3),
  id: z.optional(z.string()),
});

export type TNoteSchema = z.infer<typeof SchemaNote>;

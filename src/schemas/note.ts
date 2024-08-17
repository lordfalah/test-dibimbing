import { z } from "zod";

export const SchemaNote = z.object({
  title: z.string().min(3),
  body: z.string().min(3),
  id: z.string().min(3).optional(),
});

export type TNoteSchema = z.infer<typeof SchemaNote>;

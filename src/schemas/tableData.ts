import { z } from "astro/zod";

export const tableDataSchema = z.object({
    headers: z.array(z.string()),
    rows: z.array(z.array(z.union([z.string(), z.number()])))
});
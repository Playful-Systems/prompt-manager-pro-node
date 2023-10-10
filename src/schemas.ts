import { object, string } from "zod";

export const executeSchema = object({
  result: string()
});

// src/validation/projectSchema.ts
import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  technologies: z.string().array().optional(),
  coverImage: z.union([z.string(), z.instanceof(File)]),
  gallery: z.union([z.string().array().optional(), z.instanceof(File).array().optional()]),
  github: z.string().url().optional(),
  liveDemo: z.string().url().optional(),
  published: z.boolean().optional(),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

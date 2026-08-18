const { z } = require("zod");

const title = z.string().trim().min(1).max(200);
const description = z.string().trim().min(10).max(2000).optional();
const width = z.coerce.number().positive().finite().optional();
const height = z.coerce.number().positive().finite().optional();
const featured = z.coerce.boolean().optional();
const key = z.string().trim().min(1).max(512);

const createArtworkBody = z.strictObject({
  title,
  description,
  key,
  width,
  height,
  featured,
});

const updateArtworkBody = z
  .strictObject({
    title: title.optional(),
    width,
    height,
    featured,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one field must be provided",
  });

const listArtworkQuery = z.strictObject({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(20).optional().default(20),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

const allowedImageMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

const uploadUrlQuery = z.strictObject({
  type: z.enum(allowedImageMimeTypes),
});

module.exports = {
  createArtworkBody,
  updateArtworkBody,
  listArtworkQuery,
  uploadUrlQuery,
};

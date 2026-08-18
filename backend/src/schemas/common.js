const { z } = require("zod");

const objectIdParam = z.strictObject({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "invalid id format"),
});

module.exports = { objectIdParam };

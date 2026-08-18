const { z } = require("zod");

const loginBody = z.strictObject({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

module.exports = { loginBody };

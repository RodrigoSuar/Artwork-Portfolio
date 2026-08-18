const formatZodError = (error) => ({
  error: "validation failed",
  details: error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  })),
});

// Validates req[source] (body/params/query) against the schema.
// The parsed (type-coerced, unknown-key-stripped/rejected) result is always
// available at req.validated[source]. For "body" and "params", req[source]
// is also replaced in place — but req.query is a getter-only property on
// Express 5's request prototype, so query results must be read from
// req.validated.query instead of req.query in route handlers.
const validate = (schema, source = "body") => (req, res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    return res.status(400).json(formatZodError(result.error));
  }

  req.validated = req.validated || {};
  req.validated[source] = result.data;

  if (source !== "query") {
    req[source] = result.data;
  }

  next();
};

module.exports = validate;

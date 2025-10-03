import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: (err.issues || []).map((issue) => ({
        field: issue.path?.join(".") || "unknown",
        message: issue.message,
      })),
    });
  }

  return res.status(statusCode).json({
    message: err.message || "Something went wrong",
  });
};

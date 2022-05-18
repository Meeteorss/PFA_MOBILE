import { ErrorField } from "../types/types";

export const toErrorMap = (errors: ErrorField[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};

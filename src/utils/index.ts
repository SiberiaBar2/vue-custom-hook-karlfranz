const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (obj?: { [key: string]: unknown }) => {
  if (!obj) {
    return {};
  }

  if (typeof obj !== "object") {
    return obj;
  }

  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) {
      delete result[key];
    }
  });

  return result;
};

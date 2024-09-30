export const toCamelCase = (string: string): string => {
  return string
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

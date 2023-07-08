export const str2camel = (input: string) => {
  return `${input.slice(0, 1).toUpperCase()}${input.slice(1).toLowerCase()}`;
};

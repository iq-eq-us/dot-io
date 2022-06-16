export const truncateString = (str: string, length: number): string => {
  const trimmedString =
    str.length > length
      ? str.substring(0, length - 3) + '...'
      : str.substring(0, length);
  return trimmedString;
};

export const getOffset = (page, limit) => {
  if (page <= 1) return 0;
  return (page - 1) * limit;
};

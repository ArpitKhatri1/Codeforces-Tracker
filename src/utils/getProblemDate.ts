export const getProblemDate = (date: number) => {
  const submissionDate = new Date(date * 1000);
  const day = submissionDate.getDate();
  const month = submissionDate.getMonth() + 1;
  const year = submissionDate.getFullYear();
  return { day, year, month };
};

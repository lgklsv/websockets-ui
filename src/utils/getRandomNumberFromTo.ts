export const getRandomNumberFromTo = (from: number, to: number): number => {
  const randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;
  return randomNumber;
};

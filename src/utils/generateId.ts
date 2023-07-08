export const generateId = (): number => {
  return Math.floor(Math.random() * Date.now());
};

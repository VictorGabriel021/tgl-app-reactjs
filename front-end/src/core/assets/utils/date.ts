export const dateBrazil = (date: Date) => {
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

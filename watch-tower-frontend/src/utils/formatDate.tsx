type DateFormatType = "short" | "long" | "shortZero";

export const formatDate = (
  date: string | null | undefined,
  format: DateFormatType = "short",
) => {
  if (!date) return "—";

  const d = new Date(date);

  if (format === "long") {
    return new Intl.DateTimeFormat("es-DO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  }

  const day =
    format === "shortZero" ? String(d.getDate()).padStart(2, "0") : d.getDate();

  const month =
    format === "shortZero"
      ? String(d.getMonth() + 1).padStart(2, "0")
      : d.getMonth() + 1;

  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

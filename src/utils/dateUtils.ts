const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
});

export function formatPostDate(date: Date): string {
    return dateFormatter.format(date);
}

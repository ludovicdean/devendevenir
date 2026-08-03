const WORDS_PER_MINUTE = 200;

/** Estimate reading time in minutes from raw Markdown/MDX body. */
export function getReadingTimeMinutes(body: string | undefined): number {
    if (!body) return 1;

    const text = body
        .replace(/^---[\s\S]*?---/, "")
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/import\s+.+from\s+["'].+["'];?/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/[#>*_`~\[\]()|!\-{}]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const words = text ? text.split(" ").length : 0;
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
    return minutes <= 1 ? "1 min de lecture" : `${minutes} min de lecture`;
}

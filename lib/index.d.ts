// Type definitions for Lines

export = Lines;

declare class Lines {
    /**
     * Build an instance from a content
     * @param content
     * @throws If content is not a string
     */
    constructor(content: string);

    /**
     * Get lines as a string
     */
    get(): string;

    /**
     * Denotes if the content has been changed
     */
    changed(): boolean;

    /**
     * Get the current number of lines
     */
    length(): number;

    /**
     * Denotes if the data contains a string
     * @param search
     * @param start First line to process
     * @param end Line to stop process (not included, null => until end)
     */
    contains(search: string | RegExp, start?: number, end?: number | null): boolean;

    /**
     * Count how much lines match the search
     * @param search
     * @param start First line to process
     * @param end Line to stop process (not included, null => until end)
     */
    count(search: string | RegExp, start?: number, end?: number | null): number;

    /**
     * Get the index of the first matching line
     * @param search
     * @param start First line to process
     * @param end Line to stop process (not included, null => until end)
     */
    index(search: string | RegExp, start?: number, end?: number | null): number | null;

    /**
     * Get the indexes of the matching lines
     * @param search
     * @param start First line to process
     * @param end Line to stop process (not included, null => until end)
     */
    indexes(search: string | RegExp, start?: number, end?: number | null): number[];

    /**
     * Insert a content before a line
     * @param search
     * @param insert
     * @param start First line to process
     * @param end Line to stop process (not included, null => until end)
     */
    before(search: string | RegExp, insert: string, start?: number, end?: number | null): Lines;

    /**
     * Insert a content after a line
     * @param search
     * @param insert
     * @param start First line to process
     * @param end Line to stop process (not included, null => until end)
     */
    after(search: string | RegExp, insert: string, start?: number, end?: number | null): Lines;

    /**
     * Insert a block at the end of the content
     * @param insert
     */
    append(insert: string): Lines;

    /**
     * Insert a block at the beginning of the content
     * @param insert
     */
    prepend(insert: string): Lines;

    /**
     * Remove lines that match the pattern
     * @param search
     * @param length
     * @param start First line to process
     * @param end Line to stop process (not included, null => until end)
     */
    remove(search: string | RegExp, length?: number, start?: number, end?: number | null): Lines;

    /**
     * Replace content within a line
     * @param search
     * @param replace
     * @param start First line to process
     * @param end Line to stop process (not included, null => until end)
     */
    replaceInline(search: string | RegExp, replace: string | ReplaceInlineCallback, start?: number, end?: number | null): Lines;

}

/**
 * Callback for string replacement
 * @param substring
 * @param args
 */
declare type ReplaceInlineCallback = (substring: string, ...args: any[])=>string;


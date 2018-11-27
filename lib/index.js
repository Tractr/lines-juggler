'use strict';

const LINE_SPLITTER = /\r?\n/;
const LINE_GLUE = '\n';

class Lines {
    /**
     * Build an instance from a content
     * @param {string} content
     * @throws {Error} If content is not a string
     * @class Lines
     */
    constructor(content) {
        if (typeof content !== 'string') {
            throw new Error('Content is not a string');
        }
        /**
         * @type {string}
         * @private
         */
        this._originalContent = content;
        /**
         * @type {string[]}
         * @private
         */
        this._lines = content.split(LINE_SPLITTER);
    }
    /**
     * Get lines as a string
     * @return {string}
     */
    get() {
        return this._lines.join(LINE_GLUE);
    };
    /**
     * Denotes if the content has been changed
     * @return {boolean}
     */
    changed() {
        return this._lines.join(LINE_GLUE) !== this._originalContent.split(LINE_SPLITTER).join(LINE_GLUE);
    };
    /**
     * Get the current number of lines
     * @return {number}
     */
    length() {
        return this._lines.length;
    };
    /**
     * Denotes if the data contains a string
     * @param {string|RegExp} search
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {boolean}
     */
    contains(search, start = 0, end = null) {
        const lines = this._sub(start, end);
        for (const line of lines) {
            if (Lines._match(line, search)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Count how much lines match the search
     * @param {string|RegExp} search
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {number}
     */
    count(search, start = 0, end = null) {
        const lines = this._sub(start, end);
        let counter = 0;
        for (const line of lines) {
            if (Lines._match(line, search)) {
                counter++;
            }
        }
        return counter;
    };
    /**
     * Get the index of the first matching line
     * @param {string|RegExp} search
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {number|null}
     *  Return null if not found
     */
    index(search, start = 0, end = null) {
        const lines = this._sub(start, end);
        let counter = 0;
        for(const line of lines) {
            if (Lines._match(line, search)) {
                return start + counter;
            }
            counter++;
        }
        return null;
    };
    /**
     * Get the indexes of the matching lines
     * @param {string|RegExp} search
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {number[]}
     */
    indexes(search, start = 0, end = null) {
        const lines = this._sub(start, end);
        const output = [];
        let counter = 0;
        for(const line of lines) {
            if (Lines._match(line, search)) {
                output.push(start + counter);
            }
            counter++;
        }
        return output;
    };
    /**
     * Insert a content before a line
     * @param {string|RegExp} search
     * @param {string} insert
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {Lines}
     */
    before(search, insert, start = 0, end = null) {
        return this._insert(search, insert, true, start, end);
    };
    /**
     * Insert a content after a line
     * @param {string|RegExp} search
     * @param {string} insert
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {Lines}
     */
    after(search, insert, start = 0, end = null) {
        return this._insert(search, insert, false, start, end);
    };
    /**
     * Insert a block at the end of the content
     * @param {string} insert
     * @return {Lines}
     */
    append(insert) {
        this._lines = this._lines.concat(insert.split(LINE_SPLITTER));
        return this;
    };
    /**
     * Insert a block at the beginning of the content
     * @param {string} insert
     * @return {Lines}
     */
    prepend(insert) {
        this._lines = insert.split(LINE_SPLITTER).concat(this._lines);
        return this;
    };
    /**
     * Remove lines that match the pattern
     * @param {string|RegExp} search
     * @param {number} length
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {Lines}
     */
    remove(search, length = 1, start = 0, end = null) {
        const indexes = this.indexes(search, start, end).reverse();
        for (const index of indexes) {
            this._lines.splice(index, length);
        }
        return this;
    };
    /**
     * Callback for string replacement
     * @typedef {Function} ReplaceInlineCallback
     * @param {string} substring
     * @param {...any[]} args
     * @return {string}
     */
    /**
     * Replace content within a line
     * @param {string|RegExp} search
     * @param {string|ReplaceInlineCallback} replace
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {Lines}
     */
    replaceInline(search, replace, start = 0, end = null) {
        const indexes = this.indexes(search, start, end).reverse();
        for (const index of indexes) {
            this._lines[index] = this._lines[index].replace(search, replace);
        }
        return this;
    };
    /**
     * Insert a content before or after a line
     * @param {string|RegExp} search
     * @param {string} insert
     * @param {boolean} before
     *  True => before, False => after
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {Lines}
     * @private
     */
    _insert(search, insert, before, start = 0, end = null) {
        const output = [];
        let count = 0;
        for(const line of this._lines) {
            if (!before) output.push(line);
            const canInsert = count >= start && (end === null || count < end);
            if (canInsert && Lines._match(line, search)) {
                insert.split(LINE_SPLITTER).map(l => output.push(l));
            }
            if (before) output.push(line);
            count++;
        }
        this._lines = output;
        return this;
    };
    /**
     * Denotes if the content match the pattern
     * @param {string} line
     * @param {string|RegExp} search
     * @return {boolean}
     * @private
     */
    static _match(line, search) {
        return (typeof search === 'string' && line.indexOf(search) >= 0) ||
            (search instanceof RegExp && search.test(line));
    };
    /**
     * Returns a subset of lines
     * @param {number} start
     *  First line to process
     * @param {number|null} end
     *  Line to stop process (not included, null => until end)
     * @return {string[]}
     * @private
     */
    _sub(start = 0, end = null) {
        return this._lines.slice(start, end === null ? undefined : end);
    };
}

module.exports = Lines;
'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');

const Lines = require('../lib');

const { describe, it } = (exports.lab = Lab.script());
const expect = Code.expect;

const CONTENT = `This is the first line
This is the second line

And the fourth

Six is 6
7 is seven
Eight is after seven
`;


describe('Constructor', () => {

    it('throws an error if not created with new', () => {
        expect(() => Lines()).to.throw(Error);
    });

    it('throws an error if created without content', () => {
        expect(() => new Lines()).to.throw(Error);
    });

    it('throws an error if created with number', () => {
        expect(() => new Lines(123)).to.throw(Error);
    });

    it('throws an error if created with array', () => {
        expect(() => new Lines(['abc'])).to.throw(Error);
    });

    it('throws an error if created with object', () => {
        expect(() => new Lines({})).to.throw(Error);
    });

    it('throws an error if created with booleab', () => {
        expect(() => new Lines(false)).to.throw(Error);
    });

    it('should be crated with a valid content', () => {
        const ep = new Lines('abc');
        expect(ep).to.be.an.instanceof(Lines);
    });
});

describe('Get', () => {

    it('should return the same content', () => {
        const lines = new Lines(CONTENT);
        expect(lines.get()).to.equal(CONTENT);
    });

});

describe('Length', () => {

    it('should return the correct length', () => {
        const lines = new Lines(CONTENT);
        expect(lines.length()).to.equal(9);
    });
    
    const INSERT_CONTENT = `A line
A line
A line`;

    it('should return the correct length after insert', () => {
        const lines = new Lines(CONTENT);
        lines.after('Six is 6', INSERT_CONTENT);
        expect(lines.length()).to.equal(12);
    });

});

describe('Changed', () => {

    it('should not be changed', () => {
        const lines = new Lines(CONTENT);
        expect(lines.changed()).to.be.false();
    });

    it('should be changed', () => {
        const lines = new Lines(CONTENT);
        lines.after('Six is 6', '6 bis');
        expect(lines.changed()).to.be.true();
    });

});

describe('Contains', () => {

    it('should not contain - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.contains('not at all')).to.be.false();
    });

    it('should not contain - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.contains(/not([0-9]+)/i)).to.be.false();
    });

    it('should contain - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.contains('fourth')).to.be.true();
    });

    it('should contain - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.contains(/se([A-Z])en/i)).to.be.true();
    });

    it('should contain - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.contains('fourth', 3)).to.be.true();
    });

    it('should not contain - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.contains('fourth', 5)).to.be.false();
    });

    it('should contain - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.contains('fourth', 3, 5)).to.be.true();
    });

    it('should not contain - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.contains('fourth', 1, 3)).to.be.false();
    });

});

describe('Count', () => {

    it('should not be found - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.count('not at all')).to.equal(0);
    });

    it('should not be found - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.count(/not([0-9]+)/i)).to.equal(0);
    });

    it('should be found - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.count('fourth')).to.equal(1);
    });

    it('should be found - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.count(/([0-9])/i)).to.equal(2);
    });

    it('should be found - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.count(/([0-9])/i, 6)).to.equal(1);
    });

    it('should not be found - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.count(/([0-9])/i, 8)).to.equal(0);
    });

    it('should be found - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.count(/([0-9])/i, 2, 6)).to.equal(1);
    });

    it('should not be found - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.count(/([0-9])/i, 2, 4)).to.equal(0);
    });

});

describe('Index', () => {

    it('should not be found - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.index('not at all')).to.equal(null);
    });

    it('should not be found - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.index(/not([0-9]+)/i)).to.equal(null);
    });

    it('should be found - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.index('fourth')).to.equal(3);
    });

    it('should be found - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.index(/([0-9])/i)).to.equal(5);
    });

    it('should be found - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.index(/([0-9])/i, 6)).to.equal(6);
    });

    it('should not be found - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.index(/([0-9])/i, 8)).to.equal(null);
    });

    it('should be found - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.index(/([0-9])/i, 2, 6)).to.equal(5);
    });

    it('should not be found - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.index(/([0-9])/i, 2, 4)).to.equal(null);
    });

});

describe('Indexes', () => {

    it('should not be found - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.indexes('not at all')).to.equal([]);
    });

    it('should not be found - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.indexes(/not([0-9]+)/i)).to.equal([]);
    });

    it('should be found - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.indexes('fourth')).to.equal([3]);
    });

    it('should be found - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.indexes(/([0-9])/i)).to.equal([5, 6]);
    });

    it('should be found - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.indexes(/([0-9])/i, 6)).to.equal([6]);
    });

    it('should not be found - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.indexes(/([0-9])/i, 8)).to.equal([]);
    });

    it('should be found - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.indexes(/([0-9])/i, 2, 6)).to.equal([5]);
    });

    it('should not be found - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.indexes(/([0-9])/i, 2, 4)).to.equal([]);
    });

});

describe('Before', () => {

    it('should not be inserted - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.before('not at all', 'before')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    it('should not be inserted - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.before(/not([0-9]+)/i, 'before')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });
    
    const BEFORE_FOURTH = `This is the first line
This is the second line

before
And the fourth

Six is 6
7 is seven
Eight is after seven
`;

    it('should be inserted - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.before('fourth', 'before')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(BEFORE_FOURTH);
    });

    it('should be inserted - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.before(/([0-9])/i, 'before')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`This is the first line
This is the second line

And the fourth

before
Six is 6
before
7 is seven
Eight is after seven
`);
    });

    it('should be inserted - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.before('fourth', 'before', 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(BEFORE_FOURTH);
    });

    it('should not be inserted - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.before('fourth', 'before', 4)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    it('should be inserted - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.before('fourth', 'before', 2, 4)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(BEFORE_FOURTH);
    });

    it('should not be inserted - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.before('fourth', 'before', 0, 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

});

describe('After', () => {

    it('should not be inserted - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.after('not at all', 'after')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    it('should not be inserted - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.after(/not([0-9]+)/i, 'after')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    const AFTER_FOURTH = `This is the first line
This is the second line

And the fourth
after

Six is 6
7 is seven
Eight is after seven
`;

    it('should be inserted - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.after('fourth', 'after')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(AFTER_FOURTH);
    });

    it('should be inserted - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.after(/([0-9])/i, 'after')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`This is the first line
This is the second line

And the fourth

Six is 6
after
7 is seven
after
Eight is after seven
`);
    });

    it('should be inserted - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.after('fourth', 'after', 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(AFTER_FOURTH);
    });

    it('should not be inserted - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.after('fourth', 'after', 4)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    it('should be inserted - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.after('fourth', 'after', 2, 4)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(AFTER_FOURTH);
    });

    it('should not be inserted - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.after('fourth', 'after', 0, 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

});

describe('Remove', () => {

    it('should not be removed - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove('not at all')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    it('should not be removed - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove(/not([0-9]+)/i)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    const REMOVE_FOURTH = `This is the first line
This is the second line


Six is 6
7 is seven
Eight is after seven
`;

    it('should be removed - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove('fourth')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(REMOVE_FOURTH);
    });

    it('should be removed - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove(/([0-9])/i)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`This is the first line
This is the second line

And the fourth

Eight is after seven
`);
    });

    it('should be removed - length', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove('fourth', 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`This is the first line
This is the second line

7 is seven
Eight is after seven
`);
    });

    it('should be removed - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove('fourth', 1, 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(REMOVE_FOURTH);
    });

    it('should not be removed - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove('fourth', 1, 4)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    it('should be removed - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove('fourth', 1, 2, 4)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(REMOVE_FOURTH);
    });

    it('should not be removed - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.remove('fourth', 1, 0, 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

});

describe('Replace Inline', () => {

    it('should not be replaced - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline('not at all', 'yo')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    it('should not be replaced - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline(/not([0-9]+)/i, 'yo')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    const REPLACE_FOURTH = `This is the first line
This is the second line

And the 4th

Six is 6
7 is seven
Eight is after seven
`;

    it('should be replaced - string', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline('fourth', '4th')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(REPLACE_FOURTH);
    });

    it('should be replaced - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline(/([0-9])/i, '$1-$1')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`This is the first line
This is the second line

And the fourth

Six is 6-6
7-7 is seven
Eight is after seven
`);
    });

    it('should be incremented - regex', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline(/([0-9])/i, (m, p) => parseInt(p, 10)+1)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`This is the first line
This is the second line

And the fourth

Six is 7
8 is seven
Eight is after seven
`);
    });

    it('should be replaced - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline('fourth', '4th', 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(REPLACE_FOURTH);
    });

    it('should not be replaced - start', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline('fourth', '4th', 4)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

    it('should be replaced - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline('fourth', '4th', 2, 4)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(REPLACE_FOURTH);
    });

    it('should not be replaced - end', () => {
        const lines = new Lines(CONTENT);
        expect(lines.replaceInline('fourth', '4th', 0, 3)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(CONTENT);
    });

});

describe('Prepend', () => {

    const INSERT = 'New line 1\nNew line 2';

    it('should be prepended - content', () => {
        const lines = new Lines(CONTENT);
        expect(lines.prepend(INSERT)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`${INSERT}\n${CONTENT}`);
    });

    it('should be prepended - void', () => {
        const lines = new Lines(CONTENT);
        expect(lines.prepend('')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`\n${CONTENT}`);
    });

});

describe('Append', () => {

    const INSERT = 'New line 1\nNew line 2';

    it('should be appended - content', () => {
        const lines = new Lines(CONTENT);
        expect(lines.append(INSERT)).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`${CONTENT}\n${INSERT}`);
    });

    it('should be appended - void', () => {
        const lines = new Lines(CONTENT);
        expect(lines.append('')).to.be.an.instanceof(Lines);
        expect(lines.get()).to.equal(`${CONTENT}\n`);
    });

});

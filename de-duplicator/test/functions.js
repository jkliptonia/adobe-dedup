const { assert, expect } = require('chai');
const { compareDups, largestIndex, datesAreEqual, firstDateIsLater, findUnique } = require('../de-duplicate'); 
const { logger, logChange, prettify } = require('../logger');

//test dates
const earlyDate = new Date(2019, 2, 11, 11, 30);
const lateDate = new Date(2019, 3, 15, 10, 30);

describe('date functions', () => {
    it('should return true is first date is later of two', () => {
        
        const laterDate = { entryDate : lateDate };
        const earlierDate = { entryDate : earlyDate };
        
        assert.equal(firstDateIsLater(laterDate, earlierDate), true);
    });

    it('should return true is the two dates are equal', () => {

        const dateOne = { entryDate : lateDate };
        const dateTwo = { entryDate : lateDate };
        
        assert.equal(datesAreEqual(dateOne, dateTwo), true);
    });

    it('should return the value of an array that is higher index', () => {

        const array = [ 1, 2, 3, 4, 5];
        const lowerIndex = array[2];
        const higherIndex = array[4];

        assert.equal(largestIndex(lowerIndex, higherIndex, array), higherIndex);
    });
});

describe('compare function', () => {
    it('should return object later in array if the two contain equal dates', () => {

        const array = [ { 
                name: "first object",
                entryDate : lateDate
            },{ 
                name: "second object",
                entryDate : lateDate
            }];
        const firstObject = array[0];
        const secondObject = array[1];

        assert.equal(compareDups(firstObject, secondObject, array), secondObject);
    });

    it('should return the first object if it has the later date ', () => {

        const array = [ { 
            name: "first object",
            entryDate : lateDate
        },{ 
            name: "second object",
            entryDate : earlyDate
        }];
        const firstObject = array[0];
        const secondObject = array[1];

        assert.equal(compareDups(firstObject, secondObject, array), firstObject);
    });

    it('should return the second object if it has the later date ', () => {

        const array = [{ 
            name: "first object",
            entryDate : earlyDate
        },{ 
            name: "second object",
            entryDate : lateDate
        }];
        const firstObject = array[0];
        const secondObject = array[1];

        assert.equal(compareDups(firstObject, secondObject, array), secondObject);
    });

    it('should throw error when unable to compare arguments', () => {

        assert.throws(()=> compareDups(5, 4, []), "Unable to succesfully compare duplicates");  
    });

});

describe('findUnique function', () => {

    const array = [{
        _id: "ABC",
        email: "friend@place.com",
        entryDate: earlyDate
    },{
        _id: "CDE",
        email: "friend@place.com",
        entryDate: lateDate
    },{
        _id: "EFG",
        email: "stranger@plan.com",
        entryDate: lateDate
    }]

    it('should find unique key fields', () => {
        const { unique: uniqueEmails } = findUnique('email', array);
        const { unique: uniqueIds} = findUnique('_id', array);

        expect(uniqueEmails.length).to.eq(2);
        expect(uniqueIds.length).to.eq(3);
    });

});

describe('logger function', () => {

    const from = {
        _id: "ABC",
        email: "friend@place.com",
        entryDate: earlyDate
    };

    const to = {
        _id: "CDE",
        email: "friend@place.com",
        entryDate: lateDate
    };

    const expectedChangeFile = {
        "from" : from,
        "to" : to
    };

    it('should write changes to array', () => {

        const result = logChange([], from, to);
        assert.deepEqual(result[0], expectedChangeFile);

    });

    it('should return correctly formatted log with source, changes, and output', () => {

        const source = [ from, to ];
        const output = to;
        
        const result = logger(source, expectedChangeFile, output);

        expect(result).to.include(prettify(source));
        expect(result).to.include(prettify(expectedChangeFile));
        expect(result).to.include(prettify(output));

    });

});


const assert = require('assert');
const { compareDups, largestIndex, datesAreEqual, firstDateIsLater } = require('../index'); 

//using original file leads.json

describe('micro functions', () => {
    it('should return true is first date is later of two', () => {
        const laterDate = { entryDate : new Date(2019, 3, 15, 10, 30) };
        const earlierDate = { entryDate : new Date(2019, 2, 11, 11, 30) };
        
        assert.equal(firstDateIsLater(laterDate, earlierDate), true);
    });

    it('should return true is the two dates are equal', () => {
        const dateOne = { entryDate : new Date(2019, 3, 15, 10, 30) };
        const dateTwo = { entryDate : new Date(2019, 3, 15, 10, 30) };
        
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
    it('should return one argument if second is undefined', () => {
        const first = { };
        const second = undefined;

        assert.equal(compareDups(first, second), first);
    });

    it('should return second argument if first is undefined', () => {
        const first = undefined;
        const second = { };

        assert.equal(compareDups(first, second), second);
    });

    it('should return object later in array if the two contain equal dates', () => {
        const array = [ { 
                name: "first object",
                entryDate : new Date(2019, 3, 15, 10, 30)
            },{ 
                name: "second object",
                entryDate : new Date(2019, 3, 15, 10, 30)
            }];
        const firstObject = array[0];
        const secondObject = array[1];

        assert.equal(compareDups(firstObject, secondObject, array), secondObject);
    });

    it('should return the first object if it has the later date ', () => {
        const array = [ { 
            name: "first object",
            entryDate : new Date(2019, 3, 15, 10, 30)
        },{ 
            name: "second object",
            entryDate : new Date(2019, 2, 15, 10, 30)
        }];
        const firstObject = array[0];
        const secondObject = array[1];

        assert.equal(compareDups(firstObject, secondObject, array), firstObject);
    });

    it('should return the second object if it has the later date ', () => {
        const array = [ { 
            name: "first object",
            entryDate : new Date(2019, 2, 15, 10, 30)
        },{ 
            name: "second object",
            entryDate : new Date(2019, 3, 15, 10, 30)
        }];
        const firstObject = array[0];
        const secondObject = array[1];

        assert.equal(compareDups(firstObject, secondObject, array), secondObject);
    });
});


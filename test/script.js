const assert = require('assert');
const { leads } = require('../leads.json');
const { desired } = require('./desired.json');
const { removeDuplicates } = require('../index'); 

//using original file leads.json

describe('entire script', function() {
    it('should return desired array when fed original json', function() {
        const result = removeDuplicates(leads);
        assert.deepEqual(result, desired);
    });
});


//TODO: double check desired.json
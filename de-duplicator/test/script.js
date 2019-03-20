const { assert, expect } = require('chai');
const { leads } = require('../leads.json');
const { desired } = require('./desired.json');
const { deduplicate } = require('../de-duplicate'); 

//using original file leads.json

describe('entire script', () => {

    const result = deduplicate(leads);
    
    it('should contain each element of desired array when fed original json', () => {
        result.forEach(el => expect(desired).to.deep.contain(el));
    });

    it('should not have more elements than in desired array', () => {
        expect(desired.length).to.equal(result.length);
    });
});

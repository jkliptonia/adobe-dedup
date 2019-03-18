
const { leads } = require('./leads.json');

//TODO: add log
//TODO: update README
//TODO: stretch goal, implement command line functionality

function removeDuplicates(array) {
    
    return array.filter( (el, i, a) => {

    //eliminate current element from array to all .some() checks
    let copy = a.slice();
    copy[i] = {};

    //check for duplicates
    const dupId = copy.find((e) => el._id == e._id);
    const dupEmail = copy.find((e) => el.email== e.email);

    //no duplicate
    if ( !dupId && !dupEmail ) return el;
    //or we have a duplicate
    const duplicate = compareDups(dupId, dupEmail, a);

    if (!duplicate) throw new Error("Duplicate data lost. Check in sock drawer.")

    const desired = compareDups(duplicate, el, a);

    if (!desired) throw new Error("Did not succesfully choose between original and duplicate data.")

    if (desired == el) return el;

    //TODO: if el is not desired, we will repeat this test on duplicate.

    });
};

function compareDups(a, b, array) {
    switch(true) {
        case (!a):
            return b;
        case (!b):
            return a;
        case datesAreEqual(a,b):
            return largestIndex(a, b, array);
        case firstDateIsLater(a, b):
            return a;
        case firstDateIsLater(b, a):
            return b;
        default:
            throw new Error("Unable to succesfully compare duplicates");
    }
}

const largestIndex = (a, b, array) => array.indexOf(a) > array.indexOf(b) ? a : b;
const datesAreEqual = (a, b) => new Date(a.entryDate).getTime() == new Date(b.entryDate).getTime();
const firstDateIsLater = (a, b) => (new Date(a.entryDate) > new Date(b.entryDate));

export { removeDuplicates, compareDups, largestIndex, datesAreEqual, firstDateIsLater };

//console.log( removeDuplicates(leads) );


//TODO: add log
//TODO: update README
//TODO: add O(n) record
//TODO: stretch goal, implement command line functionality

function deduplicate(array) {

    let uniqueEmails = findUnique('email', array);
    let uniqueIds = findUnique('_id', uniqueEmails);

    const deduplicated = uniqueIds;
    console.log('WHY AM I WEIRD', deduplicated);
    return deduplicated;

}

function compareDups(a, b, array) {

    switch(true) {
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

function findUnique(key, array) {

    let result = {};

    array.reduce( (acc, curr, _, arr) => {

        const keyField = curr[key];
        const existing = acc[keyField];

        acc[keyField] = existing ? compareDups(existing, curr, arr) : curr;

        return acc;

    }, result)

    return Object.values(result);

}

const largestIndex = (a, b, array) => array.indexOf(a) > array.indexOf(b) ? a : b;
const datesAreEqual = (a, b) => new Date(a.entryDate).getTime() == new Date(b.entryDate).getTime();
const firstDateIsLater = (a, b) => (new Date(a.entryDate) > new Date(b.entryDate));

export { deduplicate, compareDups, findUnique, largestIndex, datesAreEqual, firstDateIsLater };

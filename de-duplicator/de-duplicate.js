
//TODO: add log
//TODO: test findUnique
//TODO: update README
//TODO: stretch goal, implement command line functionality

function deduplicate(array) {

    let uniqueEmails = findUnique('email', array);
    let uniqueIds = findUnique('_id', Object.values(uniqueEmails));

    const deduplicated = Object.values(uniqueIds);
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

    //TODO: can refactor to reduce
    for (let i in array) {
        const el = array[i];
        const targetField = el[key]
        const existing = result[targetField];

        result[targetField] = existing ? compareDups(existing, el, array) : el;
    }

    return result;
}

const largestIndex = (a, b, array) => array.indexOf(a) > array.indexOf(b) ? a : b;
const datesAreEqual = (a, b) => new Date(a.entryDate).getTime() == new Date(b.entryDate).getTime();
const firstDateIsLater = (a, b) => (new Date(a.entryDate) > new Date(b.entryDate));

export { deduplicate, compareDups, findUnique, largestIndex, datesAreEqual, firstDateIsLater };

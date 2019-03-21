import { logger, logChange } from "./logger";

//TODO: update README
//TODO: add O(n) record
//TODO: stretch goal, implement command line functionality

function deduplicate(array) {

    let { unique: uniqueEmails, changeFile: changedEmails } = findUnique('email', array);
    let { unique: uniqueIds, changeFile: changedIds } = findUnique('_id', uniqueEmails);

    const changeFile = [ ...changedEmails, ...changedIds ];
    const deduplicated = uniqueIds;

    logger(array, changeFile, deduplicated);
    return deduplicated;
}

function compareDups(a, b, array) {

    //a is current
    //b is proposed change

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
    let changeFile = []

    array.reduce( (acc, curr, _, arr) => {

        let uniqueData;
        const keyField = curr[key];
        const existing = acc[keyField];

        if (existing){
            uniqueData = compareDups(existing, curr, arr);
            logChange(changeFile, existing, uniqueData)
        } else {
            uniqueData = curr;
        }

        acc[keyField] = uniqueData;
        logChange(changeFile, curr, uniqueData);

        return acc;

    }, result)

    return { unique: Object.values(result), changeFile }
}

const largestIndex = (a, b, array) => array.indexOf(a) > array.indexOf(b) ? a : b;
const datesAreEqual = (a, b) => new Date(a.entryDate).getTime() == new Date(b.entryDate).getTime();
const firstDateIsLater = (a, b) => (new Date(a.entryDate) > new Date(b.entryDate));

export { deduplicate, compareDups, findUnique, largestIndex, datesAreEqual, firstDateIsLater };

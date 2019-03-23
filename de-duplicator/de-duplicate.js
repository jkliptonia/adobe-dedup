import { logger, logChange } from "./logger";

function deduplicate(array) {

    //copy of array, maintaining original index for identitcal data
    const indexedArray = array.slice();

    //find all unique emails
    let { unique: uniqueEmails, changeFile: changedEmails } = findUnique('email', array, indexedArray);
    //compare to unique ids
    let { unique: uniqueIds, changeFile: changedIds } = findUnique('_id', uniqueEmails, indexedArray);

    const changeFile = [ ...changedEmails, ...changedIds ];
    const deduplicated = uniqueIds;

    //create log and notify user
    logger(array, changeFile, deduplicated);
    return deduplicated;
}

function compareDups(curr, dup, array) {

    switch(true) {
        case datesAreEqual(curr, dup):
            return largestIndex(curr, dup, array);
        case firstDateIsLater(curr, dup):
            return curr;
        case firstDateIsLater(dup, curr):
            return dup;
        default:
            throw new Error("Unable to succesfully compare duplicates");
    }
}

function findUnique(key, array, indexedArray) {

    let result = {};
    let changeFile = [];

    array.reduce( (acc, curr) => {

        let uniqueData;
        const keyField = curr[key];
        const existing = acc[keyField];

        if (existing){
            uniqueData = compareDups(existing, curr, indexedArray);
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

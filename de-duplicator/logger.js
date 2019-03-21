const fs = require('fs');

function logger(source, changes, output) {

    const date = new Date;
    const formattedDate = date.toISOString();

    const filePath = `./logs/${formattedDate}.txt`;

    const content = `
        DE-DUPLICATE RUN ON: ${formattedDate}\n
        INPUT: \n
        ${prettify(source)} \n
        CHANGE LOG: \n
        ${prettify(changes)} \n
        OUTPUT: \n
        ${prettify(output)}
    `;

    fs.writeFile(filePath, content, ( err ) => {
        if (err) throw err;

        console.log('\x1b[36m%s\x1b[0m',`De-duplicated results written to ./logs/${formattedDate}`)
    });
}

function logChange(changeFile, from, to) {
    if (from == to) return;

    changeFile.push(
        { "from" : from,
            "to" : to
        });
}

const prettify = (obj) => JSON.stringify(obj, null, 2);

export { logChange, logger }
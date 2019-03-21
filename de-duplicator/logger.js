const fs = require('fs');

export function logger(source, changes, output) {

    const date = new Date;
    const formattedDate = date.toISOString();

    const filePath = `./logs/${formattedDate}.txt`;

    const content = `
        ${formattedDate}\n \n
        Input: \n
        ${JSON.stringify(source, null, 2)} \n \n
        Changes: \n
        ${changes} \n \n
        Output: \n
        ${JSON.stringify(output, null, 2)}
    `;

    fs.writeFile(filePath, content, ( err ) => {

        if (err) throw err;

        console.log('\x1b[36m%s\x1b[0m',`De-duplicated results written to ./logs/${formattedDate}`)
    });

}
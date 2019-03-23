# De-duplicator

Author: Jen Lipton

License: MIT © 2019

## Challenge

Take a variable number of identically structured json records and de-duplicate the set.
An example file of records is given in the accompanying 'leads.json'. Output should be same format, with dups reconciled according to the following rules:

1. Duplicate IDs count as dups. Duplicate emails count as dups. Both must be unique in our dataset. Duplicate values elsewhere do not count as dups.

2. The data from the newest date should be preferred

3. If the dates are identical the data from the record provided last in the list should be preferred

4. Simplifying assumption: the program can do everything in memory (don't worry about large files)

The application should also provide a log of changes including some representation of the source record, the output record and the individual field changes (value from and value to) for each field.

## To Run

1. Clone the repository and run ``npm i``
2. ``npm run start`` will run the de-duplicator on the source file specified in index.js (default is leads.json).

## To Change the Source File

1. Add a correctly formatted JSON file to either the root or de-duplicator folder,
2. Replace ``./de-duplicator/leads.json`` on line 1 of ``index.js`` with the respective filepath of your added JSON file.
3. Replace ``leads`` on line 1 and line 4 of ``index.js``, with the name of your array in your JSON file.
4. Run ``npm run start``

## To Run Tests

1.``npm run test`` will run the entire test suite.
2. ``npm run test-script`` will run tests checking the functionality of the whole de-duplicator script.
3. ``npm run test-functions`` will run tests on the smaller functions of the script.
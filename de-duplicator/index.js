const { leads } = require('./leads.json');
const { deduplicate } = require('./de-duplicate');

deduplicate(leads);
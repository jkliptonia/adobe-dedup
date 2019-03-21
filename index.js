const { leads } = require('./de-duplicator/leads.json');
const { deduplicate } = require('./de-duplicator/de-duplicate');

deduplicate(leads);
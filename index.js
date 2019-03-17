
const { leads } = require('./leads.json');

const sortAlphaNum = (a, b) => a._id.localeCompare(b._id, 'en', { numeric: true })

leads.sort(sortAlphaNum).filter( (el, i, a) => {

    const dupId = i == a.indexOf(el._id);
    const dupEmail = i == a.indexOf(el.email);

    if ( !dupId && !dupEmail) return el;

});

leads.sort(checkValues);

console.log(leads);
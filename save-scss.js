const fs = require('fs');
const path = require('path');

const scssPath = path.join(__dirname, 'src/sass/app.scss');

fs.utimesSync(scssPath, new Date(), new Date());
// console.log(`Saved app.scss without changes at ${scssPath}`);

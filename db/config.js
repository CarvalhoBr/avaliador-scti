const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../.env` });

const databaseConfig = require('../build/config/database');

module.exports = databaseConfig.default;

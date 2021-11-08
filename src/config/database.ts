const database = {
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  migrationStorageTableName: 'schema_migrations',
  pool: {
    min: 0,
    max: 1
  },
  password: process.env.DB_PASSWORD,
  seederStorage: 'sequelize',
  seederStorageTableName: 'schema_seeders',
  username: process.env.DB_USERNAME
};


export default database;
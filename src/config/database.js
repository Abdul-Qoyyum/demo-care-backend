require("dotenv").config();

const {
  DEV_DB_DATABASE,
  DEV_DB_HOST,
  DEV_DB_USERNAME,
  DEV_DB_PASSWORD,
  DEV_DB_DIALECT,
  CI_DB_DATABASE,
  CI_DB_HOST,
  CI_DB_USERNAME,
  CI_DB_PASSWORD,
  CI_DB_DIALECT,
  PROD_DB_DATABASE,
  PROD_DB_HOST,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_DIALECT,
  PROD_DB_PORT,
} = process.env;

module.exports = {
  development: {
    username: DEV_DB_USERNAME,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_DATABASE,
    host: DEV_DB_HOST,
    port: 3306,
    dialect: DEV_DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: CI_DB_USERNAME,
    password: CI_DB_PASSWORD,
    database: CI_DB_DATABASE,
    host: CI_DB_HOST,
    port: 3306,
    dialect: CI_DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_DATABASE,
    host: PROD_DB_HOST,
    port: PROD_DB_PORT,
    dialect: PROD_DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      // }
    },
  },
};

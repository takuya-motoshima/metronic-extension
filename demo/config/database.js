/**
 * Database configuration.
 */
module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'metronic_extension_db',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
}
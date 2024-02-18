/**
 * Database configuration.
 */
// For Docker, set the DB container name to host.
const host = process.env.IS_DOCKER ? 'metronic_extension_db' : 'localhost';
module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'metronic_db',
    host,
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
}
require('dotenv').config();
const { config } = require('./configs/db.config')

module.exports = {
    client: 'mysql2',
    connection: config,
    migrations: {
        tableName: process.env.MIGRATION_DB,
        directory: process.env.MIGRATION_DIR
    },
    seeds: {
        directory: process.env.SEEDS_DIR
    },
    pool: {
        min: Number(process.env.DB_POOL_MIN),
        max: Number(process.env.DB_POOL_MAX)
    },
    acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
}

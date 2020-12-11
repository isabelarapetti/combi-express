/* eslint-disable camelcase */

exports.shorthands = undefined
const { timestamps } = require('./helpers/timestamps')

exports.up = (pgm) => {
  const objSchema = {
    id: {
      type: 'SERIAL',
      notNull: true,
      unique: true,
      primaryKey: true
    },
    username: {
      type: 'varchar(255)',
      notNull: true
    },
    password: {
      type: 'varchar(255)',
      notNull: true
    }
  }

  const schema = { ...objSchema, ...timestamps(pgm) }
  pgm.createTable('identity', schema)

  pgm.createIndex('identity', 'id')
}

exports.down = (pgm) => {
  pgm.dropTable('identity')
}

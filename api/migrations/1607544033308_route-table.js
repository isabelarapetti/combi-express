/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  const objSchema = {
    id: 'id',
    origin: {
      type: 'varchar(255)',
      notNull: true
    },
    destination: {
      type: 'varchar(255)',
      notNull: true
    },
    origin_latitude: {
      type: 'decimal'
    },
    origin_longitude: {
      type: 'decimal'
    },
    destination_latitude: {
      type: 'decimal'
    },
    destination_longitude: {
      type: 'decimal'
    },
    time: {
      type: 'time'
    },
    price: {
      type: 'decimal',
      notNull: true
    },
    passenger_capacity: {
      type: 'int',
      notNull: true
    }
  }

  const schema = { ...objSchema }
  pgm.createTable('route', schema)

  pgm.createIndex('route', 'id')
}

exports.down = (pgm) => {
  pgm.dropTable('route')
}

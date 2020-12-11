/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  const objSchema = {
    id: 'id',
    route_id: {
      type: 'integer',
      notNull: true
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
  pgm.createTable('trip', schema)

  pgm.createIndex('trip', 'id')
  pgm.createIndex('trip', 'route_id')

  pgm.addConstraint('trip', 'trip_route_id_fk', {
    foreignKeys: {
      columns: 'route_id',
      references: 'identity (id)',
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('trip')
}

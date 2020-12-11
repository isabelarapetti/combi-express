/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  const objSchema = {
    route_id: {
      type: 'integer',
      notNull: true
    },
    identity_id: {
      type: 'integer',
      notNull: true
    }
  }

  const schema = { ...objSchema }
  pgm.createTable('reservation', schema)

  pgm.createIndex('reservation', 'route_id')
  pgm.createIndex('reservation', 'identity_id')

  pgm.addConstraint('reservation', 'reservation_route_id_fk', {
    foreignKeys: {
      columns: 'route_id',
      references: 'route (id)',
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }
  })
  pgm.addConstraint('reservation', 'reservation_identity_id_fk', {
    foreignKeys: {
      columns: 'identity_id',
      references: 'identity (id)',
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('reservation')
}

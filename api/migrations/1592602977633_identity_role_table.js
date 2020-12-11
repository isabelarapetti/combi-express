/* eslint-disable camelcase */

exports.shorthands = undefined;
const { timestamps } = require('./helpers/timestamps');

exports.up = (pgm) => {
  const objSchema =  {
      id: 'id',
      role_id: {
          type: 'integer',
          notNull: true
      },
      identity_id: {
          type: 'integer',
          notNull: true
      }
  }

  const schema = {...objSchema, ...timestamps(pgm)};
  pgm.createTable('identity_role', schema);
  
  pgm.createIndex('identity_role', 'id');
  pgm.createIndex('identity_role', 'role_id');
  pgm.createIndex('identity_role', 'identity_id');

  pgm.addConstraint('identity_role', 'identity_role_role_id_fk', {
      foreignKeys: {
          'columns': 'role_id',
          'references': 'role (id)',
          'onDelete': 'CASCADE',
          'onUpdate': 'RESTRICT',
      }
  });
  pgm.addConstraint('identity_role', 'identity_role_identity_id_fk', {
      foreignKeys: {
          'columns': 'identity_id',
          'references': 'identity (id)',
          'onDelete': 'CASCADE',
          'onUpdate': 'RESTRICT',
      }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('identity_role');
};
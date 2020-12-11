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
      permission_id: {
          type: 'integer',
          notNull: true
      }
  }

  const schema = {...objSchema, ...timestamps(pgm)};
  pgm.createTable('role_permission', schema);

  pgm.createIndex('role_permission', 'id');
  pgm.createIndex('role_permission', 'role_id');
  pgm.createIndex('role_permission', 'permission_id');

  pgm.addConstraint('role_permission', 'role_permission_role_id_fk', {
      foreignKeys: {
          'columns': 'role_id',
          'references': 'role (id)',
          'onDelete': 'CASCADE',
          'onUpdate': 'RESTRICT',
      }
  });
  pgm.addConstraint('role_permission', 'role_permission_permission_id_fk', {
      foreignKeys: {
          'columns': 'permission_id',
          'references': 'permission (id)',
          'onDelete': 'CASCADE',
          'onUpdate': 'RESTRICT',
      }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('role_permission');
};
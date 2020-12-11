/* eslint-disable camelcase */

exports.shorthands = undefined;
const { timestamps } = require('./helpers/timestamps');

exports.up = (pgm) => {
  const objSchema =  {
      id: 'id',
      token: { 
        type: 'varchar(255)', notNull: true
      },
      identity_id: {
          type: 'integer',
          notNull: true
      }
  }

  const schema = {...objSchema, ...timestamps(pgm)};
  pgm.createTable('sso_credential', schema);

  pgm.createIndex('sso_credential', 'id');
  pgm.createIndex('sso_credential', 'identity_id');

  pgm.addConstraint('sso_credential', 'sso_credential_identity_id_fk', {
      foreignKeys: {
          'columns': 'identity_id',
          'references': 'identity (id)',
          'onDelete': 'CASCADE',
          'onUpdate': 'RESTRICT',
      }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('sso_credential');
};
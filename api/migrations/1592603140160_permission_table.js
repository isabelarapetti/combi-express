/* eslint-disable camelcase */

exports.shorthands = undefined;
const { timestamps } = require('./helpers/timestamps');

exports.up = (pgm) => {
  const objSchema =  {
      id: 'id',
      code: { 
        type: 'varchar(32)', notNull: true
      },
      name: { 
        type: 'varchar(255)', notNull: true
      }
  }

  const schema = {...objSchema, ...timestamps(pgm)};
  pgm.createTable('permission', schema);
  
  pgm.createIndex('permission', 'id');
};

exports.down = (pgm) => {
  pgm.dropTable('permission');
};
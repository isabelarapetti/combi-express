/* eslint-disable camelcase */

exports.shorthands = undefined;
const { timestamps } = require('./helpers/timestamps');

exports.up = (pgm) => {
    const objSchema =  {
        id: 'id',
        name: { 
            type: 'varchar(255)', notNull: true 
        }
    }

    const schema = {...objSchema, ...timestamps(pgm)};
    pgm.createTable('role', schema);
    
    pgm.createIndex('role', 'id');
};

exports.down = (pgm) => {
    pgm.dropTable('role');
};

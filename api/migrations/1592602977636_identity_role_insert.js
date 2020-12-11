/* eslint-disable camelcase */
const fs = require('fs');

exports.shorthands = undefined;

exports.up = (pgm) => {
    const query = fs.readFileSync(__dirname + '/helpers/sql_raw/identity_role.sql').toString();
    pgm.db.query(query, (err, res) => {
        if (err) {
            console.log('->', err.stack)
        } else {
            console.log('->', res)
        }
    });
};

exports.down = (pgm) => {
    pgm.db.query('DELETE FROM identity_role');
};
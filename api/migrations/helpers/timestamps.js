
exports.timestamps = (pgm) => {
    return {
        created_date: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        created_by: {
            type: 'varchar(255)', notNull: true,
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_date: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_by: {
            type: 'varchar(255)'
        },
        updated_reason: {
            type: 'varchar(255)'
        }
    };
};
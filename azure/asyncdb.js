const mysql = require('mysql');
const util = require('util');

exports.makeDb = (config) => {
    const connection = mysql.createConnection(config);
    return {
        query(sql, args) {
        return util.promisify(connection.query)
            .call(connection, sql, args);
        },
        close() {
        return util.promisify(connection.end).call(connection);
        }
    };
};

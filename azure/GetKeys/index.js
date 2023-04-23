const codes = require('../codes.js');

module.exports = async function (context, req) {
     context.res = {
        status: 200,
        body: codes,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
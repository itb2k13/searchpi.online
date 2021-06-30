const store = require('./lib/aws/s3');
//const store = require('./spec/support/mockStore');
const botpool = require('./lib/bot/botpool');

exports.handler = async (event) => {

    var request = {};

    if (event && event.body)
        request = Object.assign(request, JSON.parse(event.body));

    let result = await botpool
        .searchPi(store, request)
        .catch(err => { return { error: err.message } });

    const response = {
        statusCode: !result.error ? 200 : 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result)
    };

    return response;
};
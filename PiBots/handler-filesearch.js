const httppool = require('./lib/http/httppool');
const config = require('./config.json');

exports.handler = async (event) => {

    var request = {};

    if (event && event.body)
        request = Object.assign(request, JSON.parse(event.body));

    var result = await httppool
        .searchPi(request, config)
        .catch(err => { return { error: err.message } });

    const response = {
        statusCode: !result.error ? 200 : 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result)
    };

    return response;

};
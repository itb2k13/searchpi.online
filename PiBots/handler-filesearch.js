const httppool = require('./lib/http/httppool');

exports.handler = async (event) => {

    var request = {};

    if (event && event.body)
        request = Object.assign(request, JSON.parse(event.body));

    var result = await httppool
        .searchPi(request)
        .catch(err => { return { error: err.message } });

    const response = {
        statusCode: !result.error ? 200 : 400,
        body: JSON.stringify(result)
    };

    return response;

};
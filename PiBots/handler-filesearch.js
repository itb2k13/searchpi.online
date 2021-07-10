const httppool = require('./lib/http/httppool');
const config = require('./config.json');

exports.handler = async (event) => {

    var request = {};
    var result = {};

    if (event && event.requestContext.http.method === "POST") {

        if (event && event.body)
            request = Object.assign(request, JSON.parse(event.body));

        result = await httppool
            .searchPi(request, config)
            .catch(err => { return { error: err.message } });

    } else {
        result = {};
    }

    const response = {
        statusCode: result.error ? 400 : 200,
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        body: JSON.stringify(result)
    };

    return response;

};
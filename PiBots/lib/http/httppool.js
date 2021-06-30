const payload = require('./payloads');
const http = require('./http');

let Module = {}

Module.searchPi = async (request, config) => {

    return new Promise(async (resolve, reject) => {

        let payloads = await payload
            .getPayloads(request)
            .catch(err => {
                return reject(err);
            });

        if (!payloads || payloads.length === 0) return reject(new Error('Cannot create http payloads.'));
        else {

            let promises = [];

            payloads.forEach(payload => {
                promises.push(http.post(config.blockSearchApi, payload));
            });

            Promise
                .all(promises)
                .then(resp => {

                    return resolve(
                        resp.map(x => x.results || x.error).flat()
                    );

                })
                .catch(err => { return reject(err); });
        }
    });

}

module.exports = Module;
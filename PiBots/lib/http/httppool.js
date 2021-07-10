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
            let startTime = Date.now();

            payloads.forEach(payload => {
                promises.push(http.post(config.blockSearchApi, payload));
            });

            Promise
                .all(promises)
                .then(resp => {

                    let results = resp.map(x => x.results || x.error).flat();
                    let totalDigits = payloads.length * request.blockSize;
                    let executionTime = (Date.now() - startTime) / 1000;
                    let topResult = results.find(x => x && x.position > -1);

                    return resolve({
                        summary: {
                            executionTime,
                            totalDigits,
                            topResult: topResult || null
                        },
                        results
                    });

                })
                .catch(err => { return reject(err); });
        }
    });

}

module.exports = Module;
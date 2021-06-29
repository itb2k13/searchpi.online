const byterange = require('../search/byterange');
const http = require('./http');

let Module = {}

Module.getPayloads = async (request) => {

    return new Promise(async (resolve, reject) => {

        let ranges = await byterange
            .getRanges(0, request.blockSize, request.maxLength)
            .catch(err => {
                return reject(err);
            });

        if (!ranges || ranges.length === 0) return reject(new Error('Cannot create block ranges.'));
        else {

            let payloads = ranges.map(range => {

                return {

                    needle: request.needle,
                    offset: range.start,
                    blockSize: request.blockSize,
                    maxLength: range.start + request.blockSize,
                    key: request.key

                };

            });

            resolve(payloads);

        }

    });
}

Module.searchPi = async (request) => {

    return new Promise(async (resolve, reject) => {

        let payloads = await Module
            .getPayloads(request)
            .catch(err => {
                return reject(err);
            });

        if (!payloads || payloads.length === 0) return reject(new Error('Cannot create http payloads.'));
        else {

            let promises = [];

            payloads.forEach(payload => {
                promises.push(http.post('https://lpcoaz6k04.execute-api.us-east-1.amazonaws.com/default/searchpi-online-blocksearch', payload));
            });

            Promise
                .all(promises)
                .then(resp => {

                    return resolve({
                        needle: request.needle,
                        results: resp.map(x => x.results).flat()
                    });

                })
                .catch(err => { return reject(err); });
        }
    });

}

module.exports = Module;
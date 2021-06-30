const byterange = require('../search/byterange');

let Module = {}

Module.getPayloads = async (request) => {

    return new Promise(async (resolve, reject) => {

        if (!request) return reject(new Error('Cannot create block ranges. Request object is null/undefined.'));

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

module.exports = Module;
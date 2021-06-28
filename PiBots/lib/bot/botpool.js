const bot = require('./bot');
const byterange = require('../search/byterange');

let Module = {}

Module.searchPi = async (store, request) => {

    return new Promise(async (resolve, reject) => {

        if (!store) reject(new Error('Cannot search Pi. Must supply store interface.'));
        else if (!request.needle) return reject(new Error('Cannot search Pi. Needle must be specified.'));
        else {

            let ranges = await byterange
                .getRanges(request.offset, request.blockSize, request.maxLength)
                .catch(err => { return reject(err); });

            let results = [];

            for (i = 0; i < ranges.length; i++) {

                if (!results.find(x => x && x.position > -1)) {

                    let result = await bot
                        .searchPi(store, request.needle, ranges[i].start, ranges[i].end, request.key)
                        .catch(err => { return reject(err); });

                    results.push(result);

                }
            }

            return resolve({
                needle: request.needle,
                results: results.filter(x => x && x.position > -1)
            });

        }

    });

}

module.exports = Module;
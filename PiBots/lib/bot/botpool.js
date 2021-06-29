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

            let promises = [];

            ranges.forEach(range => {
                promises.push(bot.searchPi(store, request.needle, range.start, range.end, request.key));
            });

            Promise
                .all(promises)
                .then(resp => {

                    return resolve({
                        needle: request.needle,
                        results: resp.filter(x => x.position > -1)
                    });

                })
                .catch(err => { return reject(err); });

        }

    });

}

module.exports = Module;
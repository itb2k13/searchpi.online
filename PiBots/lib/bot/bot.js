const search = require('../search/search');

let Module = {}

Module.searchPi = async (store, needle, start, end, key) => {

    return new Promise(async (resolve, reject) => {

        if (!store) reject(new Error('Cannot search Pi. Must supply store interface.'));
        else if (!needle) reject(new Error('Cannot search Pi. Needle must be specified.'));
        else if (needle.length <= 3) reject(new Error('Cannot search Pi. Needle must be greater than 3 characters.'));
        else {

            let startTime = Date.now();

            let pi = await store
                .getPi(start, end, key)
                .catch(err => { return reject(err); });

            let dataTime = Date.now() - startTime;

            let result = await search.searchText(needle, pi);

            let searchTime = Date.now() - startTime - dataTime;

            return resolve({
                start,
                end,
                dataTime,
                searchTime,
                position: result > -1 ? (start + result + 1) : -1
            });
        }

    });

}

module.exports = Module;
const search = require('../search/search');

let Module = {}

Module.searchPi = async (store, needle, start, end, key) => {

    return new Promise(async (resolve, reject) => {

        if (!store) reject(new Error('Cannot search Pi. Must supply store interface.'));
        else if (!needle) reject(new Error('Cannot search Pi. Needle must be specified.'));
        else if (needle.length <= 3) reject(new Error('Cannot search Pi. Needle must be greater than 3 characters.'));
        else {

            let startTime = Date.now();

            let haystack = await store
                .getPi(start, end, key)
                .catch(err => { return reject(err); });

            let dataTime = Date.now() - startTime;

            let result = await search.searchText(needle, haystack);

            let searchTime = Date.now() - startTime - dataTime;

            if (result > -1) {

                var digits = await store
                    .getPi(Math.max(start + result - 20, 0), start + result + needle.length + 20, key)
                    .catch(err => { return reject(err); });

            }

            let position = result > -1 ? (start + result - 1) : -1;

            return resolve({
                needle,
                start,
                end,
                dataTime,
                searchTime,
                digits,
                position,
                positionToString: position.toLocaleString()
            });
        }

    });

}

module.exports = Module;
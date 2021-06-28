let Module = {}

Module.getRanges = async (offset = 0, blockSize, maxLength) => {

    return new Promise(async (resolve, reject) => {

        if (!blockSize) return reject(new Error('Cannot create byte block ranges. Must specify blockSize.'));
        else if (!maxLength) return reject(new Error('Cannot create byte block ranges. Must specify maxLength.'));
        else {

            let result = [];

            for (var i = offset; (i + blockSize) <= (maxLength); i += blockSize) {
                result.push({ start: i, end: (i + blockSize) - 1 });
            }

            resolve(result);

        }

    });

}

module.exports = Module;
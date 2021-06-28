let Module = {}

Module.searchText = async (needle = "", haystack = "") => {

    return new Promise(async (resolve, reject) => {

        return resolve(haystack.indexOf(needle));

    });

}

module.exports = Module;
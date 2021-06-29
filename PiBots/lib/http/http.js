const fetch = require("node-fetch");

let Module = {}

Module.post = async (url, body) => {

    return new Promise(async (resolve, reject) => {

        var result = await fetch(url,
            {
                method: 'post',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .catch(err => {
                return reject(err);
            });

        if (result)
            return resolve(result.json());

    });

}

module.exports = Module;
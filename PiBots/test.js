const index = require('./index');
const httppool = require('./lib/http/httppool');

/*
const body = {

};

index.handler({
    body: JSON.stringify(body)
})
    .then(resp => console.log(JSON.stringify(resp)))
    .catch(err => console.error(err));
*/

httppool
    .searchPi({
        "needle": "123456789",
        blockSize: 100000000,
        maxLength: 1000000000,
        key: "pi-billion.txt"
    })
    .then(resp => console.log(JSON.stringify(resp)))
    .catch(err => console.error(err));
const handlers = require('./handlers');


handlers.BlockSearch({
    body: JSON.stringify({
        needle: "1415",
        blockSize: 1024,
        maxLength: 2048,
        key: "pi-billion.txt"
    })
})
    .then(resp => console.log(JSON.stringify(resp)))
    .catch(err => console.error(err));

/*
handlers.FileSearch({

    body: JSON.stringify({

        blockSize: 100000000,
        maxLength: 1000000000,
        needle: "123456789",
        key: "pi-billion.txt"

    })
})
    .then(resp => console.log(JSON.stringify(resp)))
    .catch(err => console.error(err));
    */
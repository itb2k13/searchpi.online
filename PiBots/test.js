const handlers = require('./handlers');


handlers.BlockSearch({
    body: JSON.stringify({
        needle: "12345",
        blockSize: 102400,
        maxLength: 204800,
        key: "pi-billion.txt"
    })
})
    .then(resp => console.log(JSON.stringify(resp)))
    .catch(err => console.error(err));

/*
handlers.FileSearch({

    body: JSON.stringify({

        blockSize: 100000000,
        maxLength: 100000000,
        needle: "1234567",
        key: "pi-billion.txt"

    })
})
    .then(resp => console.log(JSON.stringify(resp)))
    .catch(err => console.error(err));
 */
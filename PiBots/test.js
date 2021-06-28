const index = require('./index');

const body = {

};

index.handler({
    body: JSON.stringify(body)
})
    .then(resp => console.log(JSON.stringify(resp)))
    .catch(err => console.error(err));
const aws = require('aws-sdk');
const s3 = new aws.S3();

let Module = {};

Module.getPi = async (start, end, key) => {

    return new Promise(async (resolve, reject) => {

        if (!key) return reject(new Error('Cannot getObject() from S3. Must supply a Key (fileName).'))
        else if (start > end) return reject(new Error('Cannot getObject() from S3. Must supply a valid <start> and <end> byte range to obtain.'))
        else {

            s3.getObject({

                Bucket: 'searchpi.online',
                Key: key,
                Range: `bytes=${start}-${end}`

            }, (err, data) => {

                if (err)
                    return reject(err);
                else
                    return resolve(data.Body.toString('utf-8'));

            });

        }

    });

};

module.exports = Module;
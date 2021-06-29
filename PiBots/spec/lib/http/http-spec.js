const lib = require("../../../lib/http/http");

describe("Tests the HTTP GET.", function () {

    beforeEach(() => {

    });

    it('Should POST to an http remote source', async () => {

        var body = {
            title: 'foo',
            body: 'bar',
            userId: 1,
        };

        var result = await lib.post('https://jsonplaceholder.typicode.com/posts', body);

        expect(result).toEqual({ title: 'foo', body: 'bar', userId: 1, id: 101 });

    });

    it('Should POST to an http remote source and handle an error gracefully', async () => {

        await lib
            .post('https://somedomainXYZ.com', {})
            .catch(err => {
                expect(err.message).toEqual('request to https://somedomainxyz.com/ failed, reason: getaddrinfo ENOTFOUND somedomainxyz.com');
            });

    });

});
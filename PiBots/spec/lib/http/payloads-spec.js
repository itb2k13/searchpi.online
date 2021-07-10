const lib = require("../../../lib/http/payloads");

describe("Tests the HTTP pool agent.", function () {

    beforeEach(() => {

    });

    it('Should produce a set of payloads from a request input', async () => {

        let blockSize = "100000000";

        var result = await lib.getPayloads({
            needle: '1415',
            key: 'pi.txt',
            blockSize,
            maxLength: "1000000000"
        });

        expect(result.length).toEqual(10);

        expect(result[0].offset).toEqual(0);
        expect(result[0].blockSize).toEqual(100000000);
        expect(result[0].maxLength).toEqual(100000000);

        expect(result[1].offset).toEqual(100000000);
        expect(result[1].blockSize).toEqual(100000000);
        expect(result[1].maxLength).toEqual(100000000 * 2);

    });


});
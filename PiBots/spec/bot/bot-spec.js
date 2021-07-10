const lib = require("../../lib/bot/bot");
const mockStore = require('../support/mockStore');

describe("Tests the bot search.", function () {

    beforeEach(() => {

    });

    it('Should search a text string (haystack) and return the position of the needle', async () => {

        let start = 0, end = 1000;

        var result = await lib.searchPi(mockStore, "9502", start, end);

        expect(result.position).toEqual(30);
        expect(result.digits).toEqual('58979323846264338327950288419716939937510582');
        expect(result.prefixingDigits).toEqual('58979323846264338327');
        expect(result.suffixingDigits).toEqual('88419716939937510582');


    });

    it('Should search a text string (haystack) and return the prefixing digits', async () => {

        let start = 0, end = 1000;

        var result = await lib.searchPi(mockStore, "14159", start, end);

        expect(result.position).toEqual(1);
        expect(result.digits).toEqual('3.1415926535897932384626433');
        expect(result.prefixingDigits).toEqual('3.');
        expect(result.suffixingDigits).toEqual('26535897932384626433');


    });

    it('Should search a text string (haystack) and return the suffixing digits', async () => {

        let start = 0, end = 1000;

        var result = await lib.searchPi(mockStore, "65271", start, end);

        expect(result.position).toEqual(239);
        expect(result.digits).toEqual('6128475648233786783165271');
        expect(result.prefixingDigits).toEqual('61284756482337867831');
        expect(result.suffixingDigits).toEqual('');

    });


});
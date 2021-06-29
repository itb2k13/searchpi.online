const lib = require("../../../lib/search/search");
const lib2 = require("../../../lib/search/byterange");

describe("Tests the text search.", function () {

    beforeEach(() => {

    });

    it('Should search a text string (haystack) and return the position of the needle', async () => {

        var result = await lib.searchText("1234", "abcdef12345");
        expect(result).toEqual(6);

    });


    it('Should search a text string (haystack) and return -1 if it cannot find the needle', async () => {

        var result = await lib.searchText("xyz", "abcdef12345");
        expect(result).toEqual(-1);

    });

    it('Should return a collection of start and end bytes given a blockSize and maxLength and default offset of zero', async () => {

        var result = await lib2.getRanges(0, 10, 100);

        expect(result.length).toEqual(10);
        expect(result[0]).toEqual({ start: 0, end: 9 });
        expect(result[1]).toEqual({ start: 10, end: 19 });

    });


    it('Should return a collection of start and end bytes given a blockSize and maxLength and explicit offset', async () => {

        var result = await lib2.getRanges(500000, 100000, 1000000);

        expect(result.length).toEqual(5);
        expect(result[0]).toEqual({ start: 500000, end: 599999 });
        expect(result[4]).toEqual({ start: 900000, end: 999999 });

        var result2 = await lib2.getRanges(100000000, 100000000, 100000000 * 2);

        expect(result2.length).toEqual(1);
        expect(result2[0]).toEqual({ start: 100000000, end: (100000000 * 2) - 1 });


    });


});
const lib = require("../../../lib/search/search");

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


});
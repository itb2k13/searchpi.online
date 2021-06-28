const lib = require("../../lib/bot/bot");
const mockStore = require('../support/mockStore');

describe("Tests the bot search.", function () {

    beforeEach(() => {

    });

    it('Should search a text string (haystack) and return the position of the needle', async () => {

        let start = 0, end = 100;

        var result = await lib.searchPi(mockStore, "9502", start, end);
        expect(result.position).toEqual(32);

    });



});
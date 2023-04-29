// @ts-nocheck
import { RustyKeyClient } from "../client";
import { expect } from 'chai';

const Client = new RustyKeyClient();

describe("RustKeyClient", function() {

    describe('set()', function() {
        const scenarios = [
            {key: 1, value: 3},
            {key: 1, value: 2},
            {key: 1, value: 1},
            {key: 1000000, value: "someString"},
            {key: 25, value: JSON.stringify({test: "someJsonBlob"})},
        ]

        for (const {key, value } of scenarios ) {
            context(`set is called with a key of ${key} and value of ${value}`, function() {
                before(async () => {
                    await Client.set(key, value);
                });

                it('should set the provided key to the provided value', async function() {
                    const response = await Client.get(key);

                    const {status, data} = response; 

                    expect(status).to.equal(200);

                    if (typeof data === 'object') {
                        expect(JSON.stringify(data)).to.equal(value)
                    } else {
                        expect(response.data).to.equal(value);
                    }
                })
            })
        }
    })
})
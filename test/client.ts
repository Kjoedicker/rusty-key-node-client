// @ts-nocheck
import { RustyKeyClient } from "../client";
import { expect } from 'chai';
import {faker} from '@faker-js/faker';

const Client = new RustyKeyClient();

describe("RustKeyClient", function() {

    function buildScenarios() {
        const dataTypes = [
            'number', 'float', 'datetime', 
            'string',  'uuid', 'boolean', 
            'hexadecimal', 'json',
            'bigInt'
        ];

        return dataTypes.map((dataType) => {
            const fakerValue = faker.datatype[dataType]();

            let value = typeof fakerValue === 'object' ? 
                JSON.stringify(fakerValue) : 
                String(fakerValue);
    
            return { 
                type: dataType, 
                key: `${dataType}-Key`,
                value 
            };
        });
    }

    const scenarios = buildScenarios();

    describe('set()', function() {
    
        for (const {type, key, value } of scenarios ) {

            context(`set() is called for the key \`${key}\` with a value of \`${value}\` that is a ${type}`, function() {
            
                it('should return a 201 indicating success', async function(){
                    const response = await Client.set(key, value);
                    expect(response?.status).to.equal(201);
                })

                context('The key already exists', function() {
                    it('should return a 201 indicating success', async function(){
                        const response = await Client.set(key, value);
                        expect(response?.status).to.equal(201);
                    })    
                })

                it('should set the provided key to the provided value', async function() {
                    const 
                        response = await Client.get(key),
                        { status, data } = response
                    ; 

                    expect(status).to.equal(200);

                    expect(response.data).to.equal(value);
                })
            })
        }
    })

    describe('get()', function() {
        
        context('The key does not exist', function() {
            it('should return `404` indicating the key does not exist', async function() {
                const 
                    response = await Client.get("notARealKey"),
                    { status, data } = response
                ;
            
                expect(status).to.equal(404);
                expect(data).to.match(/Key not found/);
            })
        })
        
        for (const {key, value } of scenarios ) {

            context(`get() is called with the key \`${key}\` which has a value of \`${value}\``, function() {

                before(() => Client.set(key,value));
                
                it('should return the key value of ' + value, async function () {
                    const 
                        response = await Client.get(key),
                        { status, data } = response
                    ;

                    expect(status).to.equal(200);

                        expect(response.data).to.equal(value);
                });
            });
        }
    });

    describe('delete()', function() {
        
        for (const {key, value } of scenarios ) {

            context(`delete() is called with the key \`${key}\` which has a value of \`${value}\``, function() {

                before(() => Client.set(key,value));
                
                it('should return `200` indicating the delete was successful', async function () {
                    const 
                        response = await Client.delete(key),
                        { status, data } = response
                    ;

                    expect(status).to.equal(200);
                });

                context('get() is called on the deleted key', function() {
                    it('should return a `404 indicating the key does not exist`', async function() {
                        const
                            response = await Client.get(key),
                            { status, data } = response
                        ;
                    
                        expect(status).to.equal(404);
                        expect(data).to.match(/Key not found/);
                    });
                });
            });
        }

        context('delete() is  called on a key that does not exist', function() {
            it('should return `404` indicating that the key does not exist', async function() {
                const 
                    response = await Client.delete("imNotRealINeverWas"),
                    { status, data } = response
                ;

                expect(status).to.equal(404);
                expect(data).to.match(/Key not found/);
            });
        });
    });
});
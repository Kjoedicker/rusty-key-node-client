import axios, { AxiosInstance } from 'axios';
import assert from 'assert';
import { interpolateStringKey } from './functional-utils';

type callMethods = {
    [key: string]: string[]
}

class RustyKeyClient {
    baseURL: string;
    timeout: number;
    client: AxiosInstance;

    #methods: callMethods = {
        setKey:    ['POST', '/{key}/{value}'],
        getKey:    ['GET',  '/{key}'        ],
        deleteKey: ['POST', '/{key}'        ]
    }

    constructor (
        baseURL?: string,  
        timeout?: number 
    ) {
        this.baseURL = baseURL || 'http://localhost:8080';
        this.timeout = timeout || 5000;
        this.client  = axios.create({
            baseURL: this.baseURL,
            timeout: this.timeout
        });
    }

    async _call(method: string, url: string) {
        assert(method, '_call(): requires method');
        assert(url,    '_call(): requires url');

        try {
            const response = 
                await this.client({
                    method,
                    url,   
                });
            
            const { status, data } = response;

            return { status, data };
        } catch(err: any) {
            const { status, data } = err?.response || {};
    
            switch (status) {
                case 404: {
                    return { status, data }
                }
                default: {
                    console.error(`[ERROR] making ${method} to ${url}: ` + JSON.stringify(err))   
                }
            }
        }
    }

    async _callMethod(action: string, values: object) {
        assert(action, '_callMethod(): requires action');
        assert(values, '_callMethod(): requires values');

        const 
            [httpMethod, path] = this.#methods[action],
            url = interpolateStringKey(path, values)
        ;

        return this._call(httpMethod, url);
    }

    async set (key: string, value: string) {
        assert(key,   'set(): requires key');
        assert(value, 'set(): requires value');

        const action = 'setKey';

        return this._callMethod(action, {key, value});
    }

    async get (key: string) {
        assert(key, 'get(): requires key');

        const action = 'getKey';

        return this._callMethod(action, {key});
    }
}

export {
    RustyKeyClient
}


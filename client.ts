import axios, {type AxiosInstance} from 'axios';
import assert from 'assert';
import {interpolateStringKey} from './functional-utils';

type CallMethods = Record<string, string[]>;
type Response = Record<string, any>;
type Value = string | number;
type Key = string | number;

class RustyKeyClient {
	baseUrl: string;
	timeout: number;
	client: AxiosInstance;

	#methods: CallMethods = {
		setKey:    ['PUT', '/{key}'],
		getKey:    ['GET', '/{key}'],
		deleteKey: ['DELETE', '/{key}'],
	};

	constructor(
		baseURL?: string,
		timeout?: number,
	) {
		this.baseUrl = baseURL ?? 'http://localhost:8080';
		this.timeout = timeout ?? 5000;
		this.client = axios.create({
			baseURL: this.baseUrl,
			timeout: this.timeout,
		});
	}

	async _call(method: string, url: string, payload?: object): Promise<Response | boolean> {
        assert(method, '_call(): requires method');
		assert(url, '_call(): requires url');

		try {
			const response = await this.client({ 
                method, 
                url, 
                ...(payload ? {data: payload} : {})
            });

			const { status, data} = response || {};

			return {status, data};
		} catch (err: any) {
			const {status, data} = err?.response ?? {};

			switch (status) {
				case 404: {
					return {status, data};
				}

				default: {
					console.error(`[ERROR] making ${method} to ${url}: ` + JSON.stringify(err));
					return false;
				}
			}
		}
	}

	async _callMethod(action: string, key: Key, value?: Value) {
		assert(action, '_callMethod(): requires action');
		assert(key,    '_callMethod(): requires key');

		const
			[httpMethod, path] = this.#methods[action],
		    url = interpolateStringKey(path, {key}),
            payload = value ? {value} : undefined
        ;
    
		return this._call(httpMethod, url, payload);
	}

	async set(key: Key, value: Value) {
		assert(key, 'set(): requires key');
		assert(value, 'set(): requires value');

		const action = 'setKey';

		return this._callMethod(action, key, value);
	}

	async get(key: Key) {
		assert(key, 'get(): requires key');

		const action = 'getKey';

		return this._callMethod(action, key);
	}

	async delete(key: Key) {
		assert(key, 'delete(): requires key');

		const action = 'deleteKey';

		return this._callMethod(action, key);
	}
}

export {
	RustyKeyClient,
};


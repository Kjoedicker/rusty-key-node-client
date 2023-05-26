# RustyKeyClient

## About

A Typescript client for interfacing with [`rusty-key` ](https://github.com/Kjoedicker/rusty-key)

## Table of contents

### Constructors

- [constructor](README.md#constructor)

### Properties

- [#methods](README.md##methods)
- [baseUrl](README.md#baseurl)
- [client](README.md#client)
- [timeout](README.md#timeout)

### Methods

- [\_call](README.md#_call)
- [\_callMethod](README.md#_callmethod)
- [delete](README.md#delete)
- [get](README.md#get)
- [set](README.md#set)

## Constructors

### constructor

• **new RustyKeyClient**(`baseURL?`, `timeout?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseURL?` | `string` |
| `timeout?` | `number` |

#### Defined in

[client.ts:21](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L21)

## Properties

### #methods

• `Private` **#methods**: `CallMethods`

#### Defined in

[client.ts:15](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L15)

___

### baseUrl

• **baseUrl**: `string`

#### Defined in

[client.ts:11](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L11)

___

### client

• **client**: `AxiosInstance`

#### Defined in

[client.ts:13](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L13)

___

### timeout

• **timeout**: `number`

#### Defined in

[client.ts:12](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L12)

## Methods

### \_call

▸ **_call**(`method`, `url`, `payload?`): `Promise`<`boolean` \| `Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `url` | `string` |
| `payload?` | `object` |

#### Returns

`Promise`<`boolean` \| `Response`\>

#### Defined in

[client.ts:30](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L30)

___

### \_callMethod

▸ **_callMethod**(`action`, `key`, `value?`): `Promise`<`boolean` \| `Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `string` |
| `key` | `Key` |
| `value?` | `Value` |

#### Returns

`Promise`<`boolean` \| `Response`\>

#### Defined in

[client.ts:72](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L72)

___

### delete

▸ **delete**(`key`): `Promise`<`boolean` \| `Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |

#### Returns

`Promise`<`boolean` \| `Response`\>

#### Defined in

[client.ts:109](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L109)

___

### get

▸ **get**(`key`): `Promise`<`boolean` \| `Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |

#### Returns

`Promise`<`boolean` \| `Response`\>

#### Defined in

[client.ts:98](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L98)

___

### set

▸ **set**(`key`, `value`): `Promise`<`boolean` \| `Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |
| `value` | `Value` |

#### Returns

`Promise`<`boolean` \| `Response`\>

#### Defined in

[client.ts:86](https://github.com/Kjoedicker/rusty-key-node-client/blob/5569eb5/client.ts#L86)

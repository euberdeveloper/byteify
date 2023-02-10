![Lint](https://github.com/euberdeveloper/byteify/workflows/Lint/badge.svg)
![Build](https://github.com/euberdeveloper/byteify/workflows/Build/badge.svg)
![Test](https://github.com/euberdeveloper/byteify/workflows/Test/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/euberdeveloper/byteify/badge.svg?branch=main)](https://coveralls.io/github/euberdeveloper/byteify?branch=main)
[![codecov](https://codecov.io/gh/euberdeveloper/byteify/branch/main/graph/badge.svg?token=4YW49XC338)](https://codecov.io/gh/euberdeveloper/byteify)
[![Known Vulnerabilities](https://snyk.io/test/github/euberdeveloper/byteify/badge.svg?targetFile=package.json)](https://snyk.io/test/github/euberdeveloper/byteify?targetFile=package.json)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/npm/l/byteify.svg)](https://github.com/euberdeveloper/byteify/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/byteify.svg)](https://github.com/euberdeveloper/byteify/issues)
[![GitHub stars](https://img.shields.io/github/stars/euberdeveloper/byteify.svg)](https://github.com/euberdeveloper/byteify/stargazers)
![npm](https://img.shields.io/npm/v/byteify.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Types](https://img.shields.io/npm/types/byteify.svg)](https://www.npmjs.com/package/byteify)
[![Test Coverage](https://api.codeclimate.com/v1/badges/898fd5ca5774fb92d9c8/test_coverage)](https://codeclimate.com/github/euberdeveloper/byteify/test_coverage)

# byteify
An npm module that serializes or deserializes your native types to an array of bytes.

## Install

To install byteify, run:

```bash
$ npm install byteify
```

## Usage

## Serialize

```js
const byteify = require('byteify');

// The value will be: [1]
const serializedBool = byteify.serializeBool(true);

// The value will be: [10]
const serializedUint8 = byteify.serializeUint8(10); 
// The value will be: [1, 0]
const serializedUint16 = byteify.serializeUint16(256, { endianess: ByteifyEndianess.BIG_ENDIAN }); 
// The value will be: [0, 15, 66, 64]
const serializedUint32 = byteify.serializeUint32(1000000, { endianess: ByteifyEndianess.BIG_ENDIAN });
// The value will be: [0, 0, 0, 0, 5, 245, 225, 0]
const serializedUint64 = byteify.serializeUint64(100000000n, { endianess: ByteifyEndianess.BIG_ENDIAN }); 

// The value will be: [255]
const serializedInt8 = byteify.serializeInt8(-1);
// The value will be: [252, 24]
const serializedInt16 = byteify.serializeInt16(-1000, { endianess: ByteifyEndianess.BIG_ENDIAN });
// The value will be: [255, 254, 121, 96]
const serializedInt32 = byteify.serializeInt32(-100000, { endianess: ByteifyEndianess.BIG_ENDIAN });
// The value will be: [255, 255, 255, 255, 255, 255, 255, 255]
const serializedInt64 = byteify.serializeInt64(-1n, { endianess: ByteifyEndianess.BIG_ENDIAN });

// The value will be: [10, 215, 185, 65]  
const serializedFloat32 = byteify.serializeFloat32(23.23, { endianess: ByteifyEndianess.LITTLE_ENDIAN });
// The value will be: [123, 20, 174, 71, 225, 58, 55, 64]
const serializedFloat64 = byteify.serializeFloat64(23.23, { endianess: ByteifyEndianess.LITTLE_ENDIAN });
```

## Deserialize

```js
const byteify = require('byteify');
const ByteifyEndianess = byteify.ByteifyEndianess;

// The value will be: true
const deserializedBool = byteify.deserializeBool([1]);

// The value will be: 10
const deserializedUint8 = byteify.deserializeUint8([10]);
// The value will be: 1
const deserializedUint16 = byteify.deserializeUint16([1, 0], { endianess: ByteifyEndianess.BIG_ENDIAN });
// The value will be: 0
const deserializedUint32 = byteify.deserializeUint32([0, 15, 66, 64], { endianess: ByteifyEndianess.BIG_ENDIAN });
// The value will be: 100000000nn
const deserializedUint64 = byteify.deserializeUint64([5, 245, 225, 0, 5, 245, 225, 0], { endianess: ByteifyEndianess.BIG_ENDIAN });

// The value will be: -1
const deserializedInt8 = byteify.deserializeInt8([255]);
// The value will be: -1000
const deserializedInt16 = byteify.deserializeInt16([252, 24], { endianess: ByteifyEndianess.BIG_ENDIAN });
// The value will be: -100000
const deserializedInt32 = byteify.deserializeInt32([255, 254, 121, 96], { endianess: ByteifyEndianess.BIG_ENDIAN });
// The value will be: -1n
const deserializedInt64 = byteify.deserializeInt64([255, 255, 255, 255, 255, 255, 255, 255], { endianess: ByteifyEndianess.BIG_ENDIAN });

// The value will be: 23.23
const deserializedFloat32 = byteify.deserializeFloat32([10, 215, 185, 65], { endianess: ByteifyEndianess.LITTLE_ENDIAN });
// The value will be: 23.23
const deserializedFloat64 = byteify.deserializeFloat64([123, 20, 174, 71, 225, 58,  55, 64], { endianess: ByteifyEndianess.LITTLE_ENDIAN });
```

## Endianess

By default, Little Endian is used. If you want to use Big Endian, you can pass it as an option

```js
const byteify = require('byteify');
const ByteifyEndianess = byteify.ByteifyEndianess;

// The value will be: 1000000
const deserializedUint64 = byteify.deserializeUint64([64, 66, 15, 0, 0, 0, 0, 0]);
const deserializedUint64 = byteify.deserializeUint64([64, 66, 15, 0, 0, 0, 0, 0], { endianess: ByteifyEndianess.LITTLE_ENDIAN });
const deserializedUint64 = byteify.deserializeUint64([0, 0, 0, 0, 0, 15, 66, 64], { endianess: ByteifyEndianess.BIG_ENDIAN });

// The value will be [64, 66, 15, 0, 0, 0, 0, 0]
const serializedUint64 = byteify.serializeUint64(1000000, { endianess: ByteifyEndianess.LITTLE_ENDIAN });
// The value will be [0, 0, 0, 0, 0, 15, 66, 64]
const serializedUint64 = byteify.serializeUint64(1000000, { endianess: ByteifyEndianess.BIG_ENDIAN });
```

## Limits

```js
const { limits } = require('byteify');

/*
{
    bool: 1,
    uint8: 255,
    uint16: 65_535,
    uint32: 4_294_967_295,
    uint64: 18_446_744_073_709_551_616n,
    int8: 127,
    int16: 32_767,
    int32: 2_147_483_647,
    int64: 9_223_372_036_854_775_807n,
    float32: Number.MAX_VALUE,
    float64: Number.MAX_VALUE
}
*/
console.log(limits.MAX);

/*
{
    bool: 0,
    uint8: 0,
    uint16: 0,
    uint32: 0,
    uint64: 0n,
    int8: -128,
    int16: -32_768,
    int32: -2_147_483_648,
    int64: -9_223_372_036_854_775_808n,
    float32: -Number.MAX_VALUE,
    float64: -Number.MAX_VALUE
}
*/
console.log(limits.MIN);

/*
{
    bool: 1,
    uint8: 1,
    uint16: 2,
    uint32: 4,
    uint64: 8,
    int8: 1,
    int16: 2,
    int32: 4,
    int64: 8,
    float32: 4,
    float64: 8
}
*/
console.log(limits.N_OF_BYTES);
```
## API

The documentation site is: [byteify documentation](https://byteify.euber.dev)

The documentation for development site is: [byteify dev documentation](https://byteify-dev.euber.dev)

## Development

To build the module make sure you have the dev dependencies installed.

The project is written in `Typescript`, bundled with `esbuild`, linted with `ESLint` and tested with `Jest`.

### Lint

In order to lint the code:

```bash
$ npm run lint
```

In order to lint and fix the code:

```bash
$ npm run lint:fix
```

There are also the `:source` and `:test` suffix after `lint` in order to lint only the source code or the test code.

### Transpile

To transpile both the source and the test code:

```bash
$ npm run transpile
```

The `source` and the `test` folders will be transpiled in the `dist` folder. Also the `type declarations` will be generated.


To transpile only the source code:

```bash
$ npm run transpile:source
```

The `source` folder will be transpiled in the `dist` folder. Also the `type declarations` will be generated.

### Test

After having transpiled the code, run:

```bash
$ npm test
```

in order to run the tests with `jest`.

If a coverage report is to be generated, run:

```bash
$ npm run cover:generate
```

### Bundle

```bash
$ npm run bundle
```

The `source` folder will be compiled in the `bundled` folder. It will contain the bundled `index.js` and `index.d.ts` files.

### Notes

* For simplicity, the limits for the floating point numbers are always `Number.MAX_VALUE` and `-Number.MAX_VALUE`. For `float32` this means that the result is not guaranteed for too precise inputs.
* For `uint64` and `int64`, the `BigInt` type is used.
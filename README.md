![Lint](https://github.com/euberdeveloper/byteify/workflows/Lint/badge.svg)
![Build](https://github.com/euberdeveloper/byteify/workflows/Build/badge.svg)
![Test](https://github.com/euberdeveloper/byteify/workflows/Test/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/euberdeveloper/byteify/badge.svg?branch=main)](https://coveralls.io/github/euberdeveloper/byteify?branch=main)
[![codecov](https://codecov.io/gh/euberdeveloper/byteify/branch/main/graph/badge.svg?token=4YW49XC338)](https://codecov.io/gh/euberdeveloper/byteify)
[![Known Vulnerabilities](https://snyk.io/test/github/euberdeveloper/byteify/badge.svg?targetFile=package.json)](https://snyk.io/test/github/euberdeveloper/byteify?targetFile=package.json)
[![dependencies Status](https://david-dm.org/euberdeveloper/byteify/status.svg)](https://david-dm.org/euberdeveloper/byteify)
[![devDependencies Status](https://status.david-dm.org/gh/euberdeveloper/byteify.svg?type=dev)](https://david-dm.org/euberdeveloper/byteify?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/npm/l/byteify.svg)](https://github.com/euberdeveloper/byteify/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/byteify.svg)](https://github.com/euberdeveloper/byteify/issues)
[![GitHub stars](https://img.shields.io/github/stars/euberdeveloper/byteify.svg)](https://github.com/euberdeveloper/byteify/stargazers)
![npm](https://img.shields.io/npm/v/byteify.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Types](https://img.shields.io/npm/types/byteify.svg)](https://www.npmjs.com/package/byteify)
[![Maintainability](https://api.codeclimate.com/v1/badges/898fd5ca5774fb92d9c8/maintainability)](https://codeclimate.com/github/euberdeveloper/byteify/maintainability)
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

// The value will be: Uint8Array(1) [ 1 ]
const serializedBool = byteify.serializeBool(true);

// The value will be: Uint8Array(1) [ 10 ] 
const serializedUint8 = byteify.serializeUint8(10); 
// The value will be: Uint8Array(1) [ 1, 0 ]
const serializedUint16 = byteify.serializeUint16(256); 
// The value will be: Uint8Array(1) [ 0, 15, 66, 64 ]
const serializedUint32 = byteify.serializeUint32(1000000); 
// The value will be: Uint8Array(1) [ 5, 245, 225, 0, 5, 245, 225, 0 ]
const serializedUint64 = byteify.serializeUint64(100000000); 

// The value will be: Uint8Array(1) [ 255 ] 
const serializedInt8 = byteify.serializeInt8(-1); 
// The value will be: Uint8Array(1) [ 252, 24 ]
const serializedInt16 = byteify.serializeInt16(-1000); 
// The value will be: Uint8Array(1) [ 255, 254, 121, 96 ]
const serializedInt32 = byteify.serializeInt32(-100000); 
// The value will be: Uint8Array(1) [ 255, 255, 255, 255, 255, 255, 255, 255 ]
const serializedInt64 = byteify.serializeInt64(-1); 

// The value will be: Uint8Array(1) [ 10, 215, 185, 65 ] 
const serializedFloat32 = byteify.serializeFloat32(23.23); 
// The value will be: Uint8Array(1) [ 123, 20, 174, 71, 225, 58,  55, 64 ]
const serializedFloat64 = byteify.serializeFloat64(23.23);
```

## Deserialize

```js
const byteify = require('byteify');

// The value will be: Uint8Array(1) [ 1 ]
const deserializedBool = byteify.deserializeBool([ 1 ]);

// The value will be: 10
const deserializedUint8 = byteify.deserializeUint8([ 10 ]);
// The value will be: 1
const deserializedUint16 = byteify.deserializeUint16([ 1, 0 ]);
// The value will be: 0
const deserializedUint32 = byteify.deserializeUint32([ 0, 15, 66, 64 ]);
// The value will be: 5
const deserializedUint64 = byteify.deserializeUint64([ 5, 245, 225, 0, 5, 245, 225, 0 ]);

// The value will be: -1
const deserializedInt8 = byteify.deserializeInt8([ 255 ]);
// The value will be: -1000
const deserializedInt16 = byteify.deserializeInt16([ 252, 24 ]);
// The value will be: -100000
const deserializedInt32 = byteify.deserializeInt32([ 255, 254, 121, 96 ]);
// The value will be: -1
const deserializedInt64 = byteify.deserializeInt64([ 255, 255, 255, 255, 255, 255, 255, 255 ]);

// The value will be: 23.23
const deserializedFloat32 = byteify.deserializeFloat32([ 10, 215, 185, 65 ]);
// The value will be: 23.23
const deserializedFloat64 = byteify.deserializeFloat64([ 123, 20, 174, 71, 225, 58,  55, 64 ]);
```

## Limits

```js
const { limits } = require('byteify');

/*
{
    bool: 1,
    uint8: 255,
    uint16: 65535,
    uint32: 4294967295,
    uint64: Number.MAX_VALUE, // Note: problem because max value in js has 53 precision and not 64
    int8: 127,
    int16: 32767,
    int32: 2147483647,
    int64: Number.MAX_VALUE, // Note: problem because max value in js has 53 precision and not 64,
    float32: Number.MAX_VALUE, // TODO
    float64: Number.MAX_VALUE // TODO
}
*/
console.log(limits.MAX);

/*
{
    bool: 0,
    uint8: 0,
    uint16: 0,
    uint32: 0,
    uint64: 0,
    int8: -128,
    int16: -32768,
    int32: -2147483648,
    int64: -9007199254740991, // Note: problem because max value in js has 53 precision and not 64,
    float32: -9007199254740991, // TODO
    float64: -9007199254740991 // TODO
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

The documentation site is: [byteify documentation](https://byteify.vercel.app)

The documentation for development site is: [byteify dev documentation](https://byteify-dev.vercel.app)

## Development

To build the module make sure you have the dev dependencies installed.

The project is written in `Typescript`, bundled with `Webpack` and linted with `ESLint`.

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

in order to run the tests with `mocha`.

If a coverage report is to be generated, run:

```bash
$ npm run nyc
```

### Bundle

```bash
$ npm run bundle
```

The `source` folder will be compiled in the `bundled` folder. It will contain the bundled `index.js` and `index.d.ts` files.

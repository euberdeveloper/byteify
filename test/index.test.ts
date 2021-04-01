import { assert } from 'chai';
import testCases from './test-cases'

function serializeAndTest<T>(value: T, expected: number[], serializeFn: (x: T) => Uint8Array) {
    assert.deepEqual(serializeFn(value), new Uint8Array(expected));
}

function deserializeAndTest<T>(value: number[], expected: T, deserializeFn: (x: Uint8Array) => T) {
    assert.deepEqual(deserializeFn(new Uint8Array(value)), expected);
}

function serializeDeserializeAndTest<T>(value: T, serializeFn: (x: T) => Uint8Array, deserializeFn: (x: Uint8Array) => T) {
    assert.deepEqual(deserializeFn(serializeFn(value)), value);
}

function deserializeSerializeAndTest<T>(value: number[], serializeFn: (x: T) => Uint8Array, deserializeFn: (x: Uint8Array) => T) {
    const uint8ArrayValue = new Uint8Array(value);
    assert.deepEqual(serializeFn(deserializeFn(uint8ArrayValue)), uint8ArrayValue);
}

describe('Testone', function () {
    for (const testCase of testCases) {
        for (const value of testCase.values) {
            describe(testCase.name, function () {

                it(`should serialize`, function () {
                    serializeAndTest(value[0], value[1], testCase.serializeFn);
                });

                it(`should deserialize`, function () {
                    deserializeAndTest(value[1], value[0], testCase.deserializeFn);
                });

                it(`should serialize and deserialize`, function () {
                    serializeDeserializeAndTest(value[0], testCase.serializeFn, testCase.deserializeFn);
                });

                it(`should deserialize and serialize`, function () {
                    deserializeSerializeAndTest(value[1], testCase.serializeFn as (x: any) => Uint8Array, testCase.deserializeFn);
                });

            });
        }
    }
});

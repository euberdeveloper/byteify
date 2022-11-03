import { assert } from 'chai';
import testCases from './test-cases';

function serializeAndTest<T>(value: T, expected: number[], serializeFn: (x: T) => Uint8Array) {
    assert.deepEqual(serializeFn(value), new Uint8Array(expected));
}

function deserializeAndTest<T>(
    value: number[],
    expected: T,
    deserializeFn: (x: Uint8Array) => T,
    isFloatingPoint: boolean
) {
    if (isFloatingPoint) {
        assert.approximately(deserializeFn(new Uint8Array(value)) as any, expected as any, 0.01);
    } else {
        assert.deepEqual(deserializeFn(new Uint8Array(value)), expected);
    }
}

function serializeDeserializeAndTest<T>(
    value: T,
    serializeFn: (x: T) => Uint8Array,
    deserializeFn: (x: Uint8Array) => T,
    isFloatingPoint: boolean
) {
    if (isFloatingPoint) {
        assert.approximately(deserializeFn(serializeFn(value)) as any, value as any, 0.01);
    } else {
        assert.deepEqual(deserializeFn(serializeFn(value)), value);
    }
}

function deserializeSerializeAndTest<T>(
    value: number[],
    serializeFn: (x: T) => Uint8Array,
    deserializeFn: (x: Uint8Array) => T
) {
    const uint8ArrayValue = new Uint8Array(value);
    assert.deepEqual(serializeFn(deserializeFn(uint8ArrayValue)), uint8ArrayValue);
}

export default function (): void {
    describe('Test general cases', function () {
        for (const testCase of testCases) {
            describe(testCase.name, function () {
                it(`should serialize`, function () {
                    for (const value of testCase.values) {
                        serializeAndTest(value[0], value[1], testCase.serializeFn);
                    }
                });

                it(`should deserialize`, function () {
                    for (const value of testCase.values) {
                        deserializeAndTest(value[1], value[0], testCase.deserializeFn, testCase.isFloatingPoint);
                    }
                });

                it(`should serialize and deserialize`, function () {
                    for (const value of testCase.values) {
                        serializeDeserializeAndTest(
                            value[0],
                            testCase.serializeFn,
                            testCase.deserializeFn,
                            testCase.isFloatingPoint
                        );
                    }
                });

                it(`should deserialize and serialize`, function () {
                    for (const value of testCase.values) {
                        deserializeSerializeAndTest(
                            value[1],
                            testCase.serializeFn as (x: any) => Uint8Array,
                            testCase.deserializeFn
                        );
                    }
                });
            });
        }
    });
}

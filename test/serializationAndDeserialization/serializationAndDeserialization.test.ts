import { Essence, NativeType, ByteifyEndianess, ByteifyOptions } from '@src/types/index.js';
import { ESSENCE } from '@src/values/constants.js';
import testCases from './testCases.js';

function serializeAndTest<T>(
    value: T,
    expected: number[],
    serializeFn: (x: T, o: ByteifyOptions) => number[],
    type: ByteifyEndianess
) {
    expect(serializeFn(value, { endianess: type })).toStrictEqual(expected);
}

function deserializeAndTest<T>(
    value: number[],
    expected: any,
    deserializeFn: (x: number[], o: ByteifyOptions) => T,
    nativeType: NativeType,
    endianess: ByteifyEndianess
) {
    const essence = ESSENCE[nativeType];
    const result = deserializeFn(value, { endianess: endianess });

    if (essence === Essence.DECIMAL) {
        expect(result).toBeCloseTo(expected, 0.01);
    } else if (essence === Essence.INT) {
        expect(result).toStrictEqual(expected);
    } else {
        expect(result == expected).toBeTruthy();
    }
}

function serializeDeserializeAndTest<T>(
    value: T,
    serializeFn: (x: T, o: ByteifyOptions) => number[],
    deserializeFn: (x: number[], o: ByteifyOptions) => T,
    nativeType: NativeType,
    type: ByteifyEndianess
) {
    const essence = ESSENCE[nativeType];
    const result = deserializeFn(serializeFn(value, { endianess: type }), { endianess: type });

    if (essence === Essence.DECIMAL) {
        expect(result).toBeCloseTo(value as any, 0.01);
    } else if (essence === Essence.INT) {
        expect(result).toStrictEqual(value);
    } else {
        expect(result == value).toBeTruthy();
    }
}

function deserializeSerializeAndTest<T>(
    value: number[],
    serializeFn: (x: T, o: ByteifyOptions) => number[],
    deserializeFn: (x: number[], o: ByteifyOptions) => T,
    type: ByteifyEndianess
) {
    expect(serializeFn(deserializeFn(value, { endianess: type }), { endianess: type })).toStrictEqual(value);
}

describe('Test serialization and deserialization', function () {
    for (const testCase of testCases) {
        describe(testCase.nativeType, function () {
            for (const endianess of Object.values(ByteifyEndianess) as ByteifyEndianess[]) {
                describe(endianess, function () {
                    for (const tuple of testCase.tests) {
                        const { value, serialized } = tuple;
                        const expectedSerialized =
                            endianess === ByteifyEndianess.LITTLE_ENDIAN ? [...serialized].reverse() : serialized;

                        describe(`Value ${value}`, function () {
                            it(`Should serialize correctly`, function () {
                                serializeAndTest(value, expectedSerialized, testCase.serializeFn, endianess);
                            });

                            it(`Should deserialize correctly`, function () {
                                deserializeAndTest(
                                    expectedSerialized,
                                    value,
                                    testCase.deserializeFn,
                                    testCase.nativeType,
                                    endianess
                                );
                            });

                            it(`Should serialize and deserialize correctly`, function () {
                                serializeDeserializeAndTest(
                                    value,
                                    testCase.serializeFn,
                                    testCase.deserializeFn,
                                    testCase.nativeType,
                                    endianess
                                );
                            });

                            it(`Should deserialize and serialize correctly`, function () {
                                deserializeSerializeAndTest(
                                    expectedSerialized,
                                    testCase.serializeFn as (x: any) => number[],
                                    testCase.deserializeFn,
                                    endianess
                                );
                            });
                        });
                    }
                });
            }
        });
    }
});

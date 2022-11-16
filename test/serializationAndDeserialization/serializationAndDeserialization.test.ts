import { ByteifyCase, ByteifyOptions } from '../../source/modules/types';
import { Essence, NativeType } from '../../source/types';
import { ESSENCE } from '../../source/values/constants';
import testCases from './test-cases';

function serializeAndTest<T>(
    value: T,
    expected: number[],
    serializeFn: (x: T, o: ByteifyOptions) => Uint8Array,
    type: ByteifyCase
) {
    expect(serializeFn(value, { type })).toStrictEqual(new Uint8Array(expected));
}

function deserializeAndTest<T>(
    value: number[],
    expected: any,
    deserializeFn: (x: Uint8Array, o: ByteifyOptions) => T,
    nativeType: NativeType,
    endianess: ByteifyCase
) {
    const essence = ESSENCE[nativeType];
    const result = deserializeFn(new Uint8Array(value), { type: endianess });

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
    serializeFn: (x: T, o: ByteifyOptions) => Uint8Array,
    deserializeFn: (x: Uint8Array, o: ByteifyOptions) => T,
    nativeType: NativeType,
    type: ByteifyCase
) {
    const essence = ESSENCE[nativeType];
    const result = deserializeFn(serializeFn(value, { type }), { type });

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
    serializeFn: (x: T, o: ByteifyOptions) => Uint8Array,
    deserializeFn: (x: Uint8Array, o: ByteifyOptions) => T,
    type: ByteifyCase
) {
    const uint8ArrayValue = new Uint8Array(value);
    expect(serializeFn(deserializeFn(uint8ArrayValue, { type }), { type })).toStrictEqual(uint8ArrayValue);
}

describe('Test serialization and deserialization', function () {
    for (const testCase of testCases) {
        describe(testCase.nativeType, function () {
            for (const endianess of Object.values(ByteifyCase) as ByteifyCase[]) {
                describe(endianess, function () {
                    for (const tuple of testCase.tests) {
                        const { value, serialized } = tuple;
                        const expectedSerialized =
                            endianess === ByteifyCase.LITTLE_ENDIAN ? serialized.slice().reverse() : serialized;

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
                                    testCase.serializeFn as (x: any) => Uint8Array,
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

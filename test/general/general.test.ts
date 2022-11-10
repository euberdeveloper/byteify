import { ByteifyCase, ByteifyOptions } from '../../source/modules/types';
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
    expected: T,
    deserializeFn: (x: Uint8Array, o: ByteifyOptions) => T,
    isFloatingPoint: boolean,
    type: ByteifyCase
) {
    if (isFloatingPoint) {
        expect(deserializeFn(new Uint8Array(value), { type }) as any).toBeCloseTo(expected as any, 0.01);
    } else {
        expect(deserializeFn(new Uint8Array(value), { type })).toStrictEqual(expected);
    }
}

function serializeDeserializeAndTest<T>(
    value: T,
    serializeFn: (x: T, o: ByteifyOptions) => Uint8Array,
    deserializeFn: (x: Uint8Array, o: ByteifyOptions) => T,
    isFloatingPoint: boolean,
    type: ByteifyCase
) {
    if (isFloatingPoint) {
        expect(deserializeFn(serializeFn(value, { type }), { type }) as any).toBeCloseTo(value as any, 0.01);
    } else {
        expect(deserializeFn(serializeFn(value, { type }), { type })).toStrictEqual(value);
    }
}

function deserializeSerializeAndTest<T>(
    value: number[],
    serializeFn: (x: T) => Uint8Array,
    deserializeFn: (x: Uint8Array, o: ByteifyOptions) => T,
    type: ByteifyCase
) {
    const uint8ArrayValue = new Uint8Array(value);
    expect(serializeFn(deserializeFn(uint8ArrayValue, { type }))).toStrictEqual(uint8ArrayValue);
}

function deserializeAndCheckUnmutability<T>(
    serialized: number[],
    deserializeFn: (x: Uint8Array, o: ByteifyOptions) => T
) {
    const toDeserialize = new Uint8Array(serialized);
    const toDeserializeInitial = new Uint8Array(toDeserialize);
    deserializeFn(toDeserialize, { type: ByteifyCase.LITTLE_ENDIAN });
    expect(toDeserialize).toStrictEqual(toDeserializeInitial);
}

describe('Test general cases', function () {
    for (const testCase of testCases) {
        describe(testCase.name, function () {
            it('Should keep unmutability of little endian deserialization', function () {
                const size = testCase.values[0][1].length;
                const serialized = new Array(size).fill(0).map((_, i) => i);
                deserializeAndCheckUnmutability(serialized, testCase.deserializeFn);
            });

            for (const type of Object.values(ByteifyCase) as ByteifyCase[]) {
                describe(type, function () {
                    for (const tuple of testCase.values) {
                        const [v, e] = tuple;
                        const expected = type === ByteifyCase.LITTLE_ENDIAN ? e.slice().reverse() : e;

                        it(`should serialize`, function () {
                            serializeAndTest(v, expected, testCase.serializeFn, type);
                        });

                        it(`should deserialize`, function () {
                            deserializeAndTest(expected, v, testCase.deserializeFn, testCase.isFloatingPoint, type);
                        });

                        it(`should serialize and deserialize`, function () {
                            serializeDeserializeAndTest(
                                v,
                                testCase.serializeFn,
                                testCase.deserializeFn,
                                testCase.isFloatingPoint,
                                type
                            );
                        });

                        it(`should deserialize and serialize`, function () {
                            deserializeSerializeAndTest(
                                expected,
                                testCase.serializeFn as (x: any) => Uint8Array,
                                testCase.deserializeFn,
                                type
                            );
                        });
                    }
                });
            }
        });
    }
});

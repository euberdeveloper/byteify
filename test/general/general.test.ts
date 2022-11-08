import testCases from './test-cases';

function serializeAndTest<T>(value: T, expected: number[], serializeFn: (x: T) => Uint8Array) {
    expect(serializeFn(value)).toStrictEqual(new Uint8Array(expected));
}

function deserializeAndTest<T>(
    value: number[],
    expected: T,
    deserializeFn: (x: Uint8Array) => T,
    isFloatingPoint: boolean
) {
    if (isFloatingPoint) {
        expect(deserializeFn(new Uint8Array(value)) as any).toBeCloseTo(expected as any, 0.01);
    } else {
        expect(deserializeFn(new Uint8Array(value))).toStrictEqual(expected);
    }
}

function serializeDeserializeAndTest<T>(
    value: T,
    serializeFn: (x: T) => Uint8Array,
    deserializeFn: (x: Uint8Array) => T,
    isFloatingPoint: boolean
) {
    if (isFloatingPoint) {
        expect(deserializeFn(serializeFn(value)) as any).toBeCloseTo(value as any, 0.01);
    } else {
        expect(deserializeFn(serializeFn(value))).toStrictEqual(value);
    }
}

function deserializeSerializeAndTest<T>(
    value: number[],
    serializeFn: (x: T) => Uint8Array,
    deserializeFn: (x: Uint8Array) => T
) {
    const uint8ArrayValue = new Uint8Array(value);
    expect(serializeFn(deserializeFn(uint8ArrayValue))).toStrictEqual(uint8ArrayValue);
}

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

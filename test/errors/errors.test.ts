import * as byteify from '../../source';
import { Essence, NativeType } from '../../source/types';
import { ESSENCE, MAX, MIN, N_OF_BYTES } from '../../source/values/constants';

function testErrorDueToWrongType(serializingFunction: (value: any) => Uint8Array, nativeType: NativeType) {
    const essence = ESSENCE[nativeType];

    const assertConditionally = (value: any) => {
        essence === Essence.BIGINT ? expect(value).not.toThrowError() : expect(value).toThrowError();
    };

    expect(() => serializingFunction('test')).toThrowError();
    expect(() => serializingFunction('string')).toThrowError();
    expect(() => serializingFunction({})).toThrowError();
    expect(() => serializingFunction([])).toThrowError();

    assertConditionally(() => serializingFunction(1n));
}

function testErrorDueToDecimalValue(serializingFunction: (value: any) => Uint8Array, nativeType: NativeType) {
    const essence = ESSENCE[nativeType];

    const assertConditionally = (value: any) => {
        essence === Essence.DECIMAL ? expect(value).not.toThrowError() : expect(value).toThrowError();
    };

    assertConditionally(() => serializingFunction(23.23));
    assertConditionally(() => serializingFunction(-23.23));
    assertConditionally(() => serializingFunction(0.0023));
}

function testErrorDueToSmallValue(serializingFunction: (value: any) => Uint8Array, nativeType: NativeType) {
    const min = MIN[nativeType];
    const essence = ESSENCE[nativeType];

    const assertConditionally = (value: any) => {
        essence === Essence.DECIMAL ? expect(value).not.toThrowError() : expect(value).toThrowError();
    };

    if (typeof min === 'number') {
        assertConditionally(() => serializingFunction(min - 1));
    } else {
        assertConditionally(() => serializingFunction(min - 1n));
    }
}

function testErrorDueToLargeValue(serializingFunction: (value: any) => Uint8Array, nativeType: NativeType) {
    const max = MAX[nativeType];
    const essence = ESSENCE[nativeType];

    const assertConditionally = (value: any) => {
        essence === Essence.DECIMAL ? expect(value).not.toThrowError() : expect(value).toThrowError();
    };

    if (typeof max === 'number') {
        assertConditionally(() => serializingFunction(max + 1));
    } else {
        assertConditionally(() => serializingFunction(max + 1n));
    }
}

function testErrorDueToEmptyArray(deserializingFunction: (value: Uint8Array) => any) {
    expect(() => deserializingFunction(Uint8Array.from([]))).toThrowError();
}

function testErrorDueToWrongArrayLength(deserializingFunction: (value: Uint8Array) => any, nativeType: NativeType) {
    const length: number = N_OF_BYTES[nativeType];

    expect(() => deserializingFunction(new Uint8Array(length - 1))).toThrowError();
    expect(() => deserializingFunction(new Uint8Array(length + 1))).toThrowError();
}

const testCases = [
    {
        nativeType: NativeType.UINT8,
        serialize: byteify.serializeUint8,
        deserialize: byteify.deserializeUint8
    },
    {
        nativeType: NativeType.UINT16,
        serialize: byteify.serializeUint16,
        deserialize: byteify.deserializeUint16
    },
    {
        nativeType: NativeType.UINT32,
        serialize: byteify.serializeUint32,
        deserialize: byteify.deserializeUint32
    },
    {
        nativeType: NativeType.UINT64,
        serialize: byteify.serializeUint64,
        deserialize: byteify.deserializeUint64
    },
    {
        nativeType: NativeType.INT8,
        serialize: byteify.serializeInt8,

        deserialize: byteify.deserializeInt8
    },
    {
        nativeType: NativeType.INT16,
        serialize: byteify.serializeInt16,
        deserialize: byteify.deserializeInt16
    },
    {
        nativeType: NativeType.INT32,
        serialize: byteify.serializeInt32,

        deserialize: byteify.deserializeInt32
    },
    {
        nativeType: NativeType.INT64,
        serialize: byteify.serializeInt64,
        deserialize: byteify.deserializeInt64
    },
    {
        nativeType: NativeType.FLOAT32,
        serialize: byteify.serializeFloat32,
        deserialize: byteify.deserializeFloat32
    },
    {
        nativeType: NativeType.FLOAT64,
        serialize: byteify.serializeFloat64,
        deserialize: byteify.deserializeFloat64
    }
];

describe('Test errored cases', function () {
    for (const testCase of testCases) {
        describe(testCase.nativeType, function () {
            describe('Serialize', function () {
                it('should throw an error due to wrong type', function () {
                    testErrorDueToWrongType(testCase.serialize, testCase.nativeType);
                });

                it('should throw an error due to decimal value', function () {
                    testErrorDueToDecimalValue(testCase.serialize, testCase.nativeType);
                });

                it('should throw an error due to small value', function () {
                    testErrorDueToSmallValue(testCase.serialize, testCase.nativeType);
                });

                it('Should throw an error due to value too big', function () {
                    testErrorDueToLargeValue(testCase.serialize, testCase.nativeType);
                });
            });

            describe('Deserialize', function () {
                it('Should throw an error due to empty array', function () {
                    testErrorDueToEmptyArray(testCase.deserialize);
                });
                it('Should throw an error due to wrong array length', function () {
                    testErrorDueToWrongArrayLength(testCase.deserialize, testCase.nativeType);
                });
            });
        });
    }
});

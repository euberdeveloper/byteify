import { Essence, NativeType } from '@src/types/index.js';
import { ESSENCE, MAX, MIN, N_OF_BYTES } from '@src/values/index.js';
import {
    ByteifyDeserializationInvalidLengthError,
    ByteifyDeserializationWrongResultError,
    ByteifySerializationCannotBeDecimalError,
    ByteifySerializationInputTooBigError,
    ByteifySerializationInputTooSmallError,
    ByteifySerializationWrongTypeError
} from '../../source/errors';

export function testErrorDueToWrongType(serializingFunction: (value: any) => number[], nativeType: NativeType): void {
    const essence = ESSENCE[nativeType];

    const assertConditionallyBigInt = (value: any) => {
        essence === Essence.BIGINT
            ? expect(value).not.toThrowError()
            : expect(value).toThrowError(ByteifySerializationWrongTypeError);
    };
    const assertConditionallyNumber = (value: any) => {
        essence !== Essence.BIGINT
            ? expect(value).not.toThrowError(ByteifySerializationWrongTypeError)
            : expect(value).toThrowError(ByteifySerializationWrongTypeError);
    };

    expect(() => serializingFunction('test')).toThrowError(ByteifySerializationWrongTypeError);
    expect(() => serializingFunction('string')).toThrowError(ByteifySerializationWrongTypeError);
    expect(() => serializingFunction({})).toThrowError(ByteifySerializationWrongTypeError);
    expect(() => serializingFunction([])).toThrowError(ByteifySerializationWrongTypeError);

    assertConditionallyBigInt(() => serializingFunction(1n));
    assertConditionallyNumber(() => serializingFunction(1));
}

export function testErrorDueToDecimalValue(
    serializingFunction: (value: any) => number[],
    nativeType: NativeType
): void {
    const essence = ESSENCE[nativeType];

    const assertConditionally = (value: any) => {
        switch (essence) {
            case Essence.INT:
                return expect(value).toThrowError(ByteifySerializationCannotBeDecimalError);
            case Essence.BIGINT:
                return expect(value).toThrowError(ByteifySerializationWrongTypeError);
            case Essence.DECIMAL:
                return expect(value).not.toThrowError();
        }
    };

    assertConditionally(() => serializingFunction(23.23));
    assertConditionally(() => serializingFunction(-23.23));
    assertConditionally(() => serializingFunction(0.0023));
}

export function testErrorDueToSmallValue(serializingFunction: (value: any) => number[], nativeType: NativeType): void {
    const min = MIN[nativeType];
    const essence = ESSENCE[nativeType];

    const assertConditionally = (value: any) => {
        essence === Essence.DECIMAL
            ? expect(value).not.toThrowError()
            : expect(value).toThrowError(ByteifySerializationInputTooSmallError);
    };

    if (typeof min === 'number') {
        assertConditionally(() => serializingFunction(min - 1));
    } else {
        assertConditionally(() => serializingFunction(min - 1n));
    }
}

export function testErrorDueToLargeValue(serializingFunction: (value: any) => number[], nativeType: NativeType): void {
    const max = MAX[nativeType];
    const essence = ESSENCE[nativeType];

    const assertConditionally = (value: any) => {
        essence === Essence.DECIMAL
            ? expect(value).not.toThrowError()
            : expect(value).toThrowError(ByteifySerializationInputTooBigError);
    };

    if (typeof max === 'number') {
        assertConditionally(() => serializingFunction(max + 1));
    } else {
        assertConditionally(() => serializingFunction(max + 1n));
    }
}

export function testErrorDueToEmptyArray(deserializingFunction: (value: number[]) => any): void {
    expect(() => deserializingFunction([])).toThrowError();
}

export function testErrorDueToWrongResult(
    deserializingFunction: (value: number[]) => any,
    nativeType: NativeType
): void {
    const assertConditionally = (value: any) => {
        nativeType === NativeType.BOOL
            ? expect(value).toThrowError(ByteifyDeserializationWrongResultError)
            : expect(value).not.toThrowError(ByteifyDeserializationWrongResultError);
    };

    assertConditionally(() => deserializingFunction([15]));
}

export function testErrorDueToWrongArrayLength(
    deserializingFunction: (value: number[]) => any,
    nativeType: NativeType
): void {
    const length: number = N_OF_BYTES[nativeType];

    expect(() => deserializingFunction([...new Array(length - 1).keys()])).toThrowError(
        ByteifyDeserializationInvalidLengthError
    );
    expect(() => deserializingFunction([...new Array(length + 1).keys()])).toThrowError(
        ByteifyDeserializationInvalidLengthError
    );
}

import { Essence, NativeType } from '../../source/types';
import { ESSENCE, MAX, MIN, N_OF_BYTES } from '../../source/values/constants';

export function testErrorDueToWrongType(serializingFunction: (value: any) => Uint8Array, nativeType: NativeType): void {
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

export function testErrorDueToDecimalValue(
    serializingFunction: (value: any) => Uint8Array,
    nativeType: NativeType
): void {
    const essence = ESSENCE[nativeType];

    const assertConditionally = (value: any) => {
        essence === Essence.DECIMAL ? expect(value).not.toThrowError() : expect(value).toThrowError();
    };

    assertConditionally(() => serializingFunction(23.23));
    assertConditionally(() => serializingFunction(-23.23));
    assertConditionally(() => serializingFunction(0.0023));
}

export function testErrorDueToSmallValue(
    serializingFunction: (value: any) => Uint8Array,
    nativeType: NativeType
): void {
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

export function testErrorDueToLargeValue(
    serializingFunction: (value: any) => Uint8Array,
    nativeType: NativeType
): void {
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

export function testErrorDueToEmptyArray(deserializingFunction: (value: Uint8Array) => any): void {
    expect(() => deserializingFunction(Uint8Array.from([]))).toThrowError();
}

export function testErrorDueToWrongArrayLength(
    deserializingFunction: (value: Uint8Array) => any,
    nativeType: NativeType
): void {
    const length: number = N_OF_BYTES[nativeType];

    expect(() => deserializingFunction(new Uint8Array(length - 1))).toThrowError();
    expect(() => deserializingFunction(new Uint8Array(length + 1))).toThrowError();
}
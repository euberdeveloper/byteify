import { ESSENCE, N_OF_BYTES } from '@src/values/index.js';
import { ByteifyEndianess, ByteifyOptions, Essence, NativeType } from '@src/types/index.js';

export function testImmutabilityOfDeserializationInput(
    nativeType: NativeType,
    endianess: ByteifyEndianess,
    deserialize: (value: number[], options?: ByteifyOptions) => any
): void {
    const length = N_OF_BYTES[nativeType];
    const toDeserialize = [...new Array(length).keys()].fill(0).map((_, i) => i);
    const toDeserializeInitial = [...toDeserialize];
    deserialize(toDeserialize, { endianess: endianess });
    expect(toDeserialize).toStrictEqual(toDeserializeInitial);
}

export function testLittleEndianusedByDefault(
    nativeType: NativeType,
    serialize: (value: any, options?: ByteifyOptions) => number[],
    deserialize: (value: number[], options?: ByteifyOptions) => any
): void {
    const essence = ESSENCE[nativeType];
    const value = essence === Essence.BIGINT ? 23n : 23;
    const serialized = serialize(value);
    const deserialized = deserialize(serialized);
    expect(serialize(value, { endianess: ByteifyEndianess.LITTLE_ENDIAN })).toStrictEqual(serialized);
    expect(deserialize(serialized, { endianess: ByteifyEndianess.LITTLE_ENDIAN })).toStrictEqual(deserialized);
}

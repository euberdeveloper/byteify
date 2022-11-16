import { Essence, NativeType } from '../types';
import { ESSENCE, HANDLER, MAX, MIN, SUPPORTED_TYPE } from '../values/constants';
import { ByteifyCase, ByteifyOptions } from './types';

/**
 * Serializes a number into an Uint8Array.
 * @notExported
 * @category Helper
 * @param value The number to serialize.
 * @param nativeType The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The serialized Uint8Array.
 */
function serialize(value: number | bigint, nativeType: NativeType, options: ByteifyOptions): Uint8Array {
    const essence: Essence = ESSENCE[nativeType];
    const max = MAX[nativeType];
    const min = MIN[nativeType];

    if (SUPPORTED_TYPE[essence] !== typeof value) {
        throw new Error(`Invalid ${nativeType}: value must be a ${SUPPORTED_TYPE[essence]}`);
    }

    if (essence !== Essence.DECIMAL) {
        if ((typeof value === 'number' && value % 1 !== 0) || (typeof value === 'bigint' && value % 1n !== 0n)) {
            throw new Error(`Invalid ${nativeType}: value cannot be decimal`);
        }

        if (value < min) {
            throw new Error(`Invalid ${nativeType}: value cannot be lower than ${min}`);
        }
        if (value > max) {
            throw new Error(`Invalid ${nativeType}: value cannot be bigger than ${max}`);
        }
    }

    const SerializationClass = HANDLER[nativeType];
    const result = new Uint8Array(new SerializationClass([value]).buffer);
    return options.type === ByteifyCase.LITTLE_ENDIAN ? result : result.reverse();
}

/**
 * Serializes a boolean into an Uint8Array.
 * @param value The boolean to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The boolean serialized in an Uint8Array.
 */
export function serializeBool(value: boolean, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(+value, NativeType.BOOL, options);
}

/**
 * Serializes an uint8 into an Uint8Array.
 * @param value The uint8 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint8 serialized in an Uint8Array.
 */
export function serializeUint8(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(value, NativeType.UINT8, options);
}

/**
 * Serializes an uint16 into an Uint8Array.
 * @param value The uint16 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint16 serialized in an Uint8Array.
 */
export function serializeUint16(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(value, NativeType.UINT16, options);
}

/**
 * Serializes an uint32 into an Uint8Array.
 * @param value The uint32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint32 serialized in an Uint8Array.
 */
export function serializeUint32(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(value, NativeType.UINT32, options);
}

/**
 * Serializes an uint64 into an Uint8Array.
 * @param value The uint64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint64 serialized in an Uint8Array.
 */
export function serializeUint64(value: bigint, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(value, NativeType.UINT64, options);
}

/**
 * Serializes an int8 into an Uint8Array.
 * @param value The int8 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int8 serialized in an Uint8Array.
 */
export function serializeInt8(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(value, NativeType.INT8, options);
}

/**
 * Serializes an int16 into an Uint8Array.
 * @param value The int16 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int16 serialized in an Uint8Array.
 */
export function serializeInt16(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(value, NativeType.INT16, options);
}

/**
 * Serializes an int32 into an Uint8Array.
 * @param value The int32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int32 serialized in an Uint8Array.
 */
export function serializeInt32(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(value, NativeType.INT32, options);
}

/**
 * Serializes an int64 into an Uint8Array.
 * @param value The int64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int64 serialized in an Uint8Array.
 */
export function serializeInt64(value: bigint, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serialize(value, NativeType.INT64, options);
}

/**
 * Serializes a float32 into an Uint8Array.
 * @param value The float32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The float32 serialized in an Uint8Array.
 */
export function serializeFloat32(
    value: number,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.FLOAT32, options);
}

/**
 * Serializes a float64 into an Uint8Array.
 * @param value The float64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The float64 serialized in an Uint8Array.
 */
export function serializeFloat64(
    value: number,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.FLOAT64, options);
}

import {
    ByteifySerializationCannotBeDecimalError,
    ByteifySerializationWrongTypeError,
    ByteifySerializationInputTooSmallError,
    ByteifySerializationInputTooBigError
} from '../errors';
import { Essence, NativeType } from '../types';
import { ESSENCE, HANDLER, MAX, MIN, SUPPORTED_TYPE } from '../values';
import { ByteifyEndianess, ByteifyOptions } from './types';

/**
 * Serializes a number into an array of bytes.
 * @notExported
 * @category Helper
 * @param value The number to serialize.
 * @param nativeType The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The serialized array.
 */
function serialize(value: number | bigint, nativeType: NativeType, options: ByteifyOptions): number[] {
    const essence: Essence = ESSENCE[nativeType];
    const max = MAX[nativeType];
    const min = MIN[nativeType];

    if (SUPPORTED_TYPE[essence] !== typeof value) {
        throw new ByteifySerializationWrongTypeError(
            `Invalid ${nativeType}: value must be a ${SUPPORTED_TYPE[essence]}`,
            nativeType,
            options.endianess,
            value,
            undefined,
            typeof value,
            SUPPORTED_TYPE[essence]
        );
    }

    if (essence !== Essence.DECIMAL) {
        if ((typeof value === 'number' && value % 1 !== 0) || (typeof value === 'bigint' && value % 1n !== 0n)) {
            throw new ByteifySerializationCannotBeDecimalError(
                `Invalid ${nativeType}: value cannot be decimal`,
                nativeType,
                options.endianess,
                value,
                undefined
            );
        }

        if (value < min) {
            throw new ByteifySerializationInputTooSmallError(
                `Invalid ${nativeType}: value cannot be lower than ${min}`,
                nativeType,
                options.endianess,
                value,
                undefined
            );
        }
        if (value > max) {
            throw new ByteifySerializationInputTooBigError(
                `Invalid ${nativeType}: value cannot be higher than ${max}`,
                nativeType,
                options.endianess,
                value,
                undefined
            );
        }
    }

    const SerializationClass = HANDLER[nativeType];
    const result = Array.from(new Uint8Array(new SerializationClass([value]).buffer));
    return options.endianess === ByteifyEndianess.LITTLE_ENDIAN ? result : result.reverse();
}

/**
 * Validates and converts a boolean into a number[... to be serialized.
 * @notExported
 * @category Helper
 * @param value The boolean to serialize.
 * @returns The boolean converted into a number.
 */
function purgeBoolean(value: boolean | number): number {
    if (typeof value !== 'boolean' && typeof value !== 'number') {
        throw new ByteifySerializationWrongTypeError(
            `Invalid bool: value must be a boolean`,
            NativeType.BOOL,
            undefined,
            value,
            undefined,
            typeof value,
            'boolean'
        );
    }

    return +value;
}

/**
 * Serializes a boolean into an array of bytes.
 * @param value The boolean to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The boolean serialized in an array of bytes.
 */
export function serializeBool(
    value: boolean,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(purgeBoolean(value), NativeType.BOOL, options);
}

/**
 * Serializes an uint8 into an array of bytes.
 * @param value The uint8 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The uint8 serialized in an array of bytes.
 */
export function serializeUint8(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.UINT8, options);
}

/**
 * Serializes an uint16 into an array of bytes.
 * @param value The uint16 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The uint16 serialized in an array of bytes.
 */
export function serializeUint16(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.UINT16, options);
}

/**
 * Serializes an uint32 into an array of bytes.
 * @param value The uint32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The uint32 serialized in an array of bytes.
 */
export function serializeUint32(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.UINT32, options);
}

/**
 * Serializes an uint64 into an array of bytes.
 * @param value The uint64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The uint64 serialized in an array of bytes.
 */
export function serializeUint64(
    value: bigint,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.UINT64, options);
}

/**
 * Serializes an int8 into an array of bytes.
 * @param value The int8 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The int8 serialized in an array of bytes.
 */
export function serializeInt8(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.INT8, options);
}

/**
 * Serializes an int16 into an array of bytes.
 * @param value The int16 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The int16 serialized in an array of bytes.
 */
export function serializeInt16(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.INT16, options);
}

/**
 * Serializes an int32 into an array of bytes.
 * @param value The int32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The int32 serialized in an array of bytes.
 */
export function serializeInt32(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.INT32, options);
}

/**
 * Serializes an int64 into an array of bytes.
 * @param value The int64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The int64 serialized in an array of bytes.
 */
export function serializeInt64(
    value: bigint,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.INT64, options);
}

/**
 * Serializes a float32 into an array of bytes.
 * @param value The float32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The float32 serialized in an array of bytes.
 */
export function serializeFloat32(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.FLOAT32, options);
}

/**
 * Serializes a float64 into an array of bytes.
 * @param value The float64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The float64 serialized in an array of bytes.
 */
export function serializeFloat64(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number[] {
    return serialize(value, NativeType.FLOAT64, options);
}

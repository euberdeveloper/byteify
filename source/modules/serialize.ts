import { ByteifySerializationCannotBeDecimalError, ByteifySerializationWrongTypeError } from '../errors';
import { ByteifySerializationInputTooBigError } from '../errors/InputTooBigError';
import { ByteifySerializationInputTooSmallError } from '../errors/InputTooSmallError';
import { Essence, NativeType } from '../types';
import { ESSENCE, HANDLER, MAX, MIN, SUPPORTED_TYPE } from '../values/constants';
import { ByteifyEndianess, ByteifyOptions } from './types';

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
                undefined,
                typeof value,
                'integer'
            );
        }

        if (value < min) {
            throw new ByteifySerializationInputTooSmallError(
                `Invalid ${nativeType}: value cannot be lower than ${min}`,
                nativeType,
                options.endianess,
                value,
                undefined,
                typeof value,
                'integer'
            );
        }
        if (value > max) {
            throw new ByteifySerializationInputTooBigError(
                `Invalid ${nativeType}: value cannot be higher than ${max}`,
                nativeType,
                options.endianess,
                value,
                undefined,
                typeof value,
                'integer'
            );
        }
    }

    const SerializationClass = HANDLER[nativeType];
    const result = new Uint8Array(new SerializationClass([value]).buffer);
    return options.endianess === ByteifyEndianess.LITTLE_ENDIAN ? result : result.reverse();
}

/**
 * Serializes a boolean into an Uint8Array.
 * @param value The boolean to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The boolean serialized in an Uint8Array.
 */
export function serializeBool(
    value: boolean,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(+value, NativeType.BOOL, options);
}

/**
 * Serializes an uint8 into an Uint8Array.
 * @param value The uint8 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint8 serialized in an Uint8Array.
 */
export function serializeUint8(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.UINT8, options);
}

/**
 * Serializes an uint16 into an Uint8Array.
 * @param value The uint16 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint16 serialized in an Uint8Array.
 */
export function serializeUint16(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.UINT16, options);
}

/**
 * Serializes an uint32 into an Uint8Array.
 * @param value The uint32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint32 serialized in an Uint8Array.
 */
export function serializeUint32(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.UINT32, options);
}

/**
 * Serializes an uint64 into an Uint8Array.
 * @param value The uint64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint64 serialized in an Uint8Array.
 */
export function serializeUint64(
    value: bigint,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.UINT64, options);
}

/**
 * Serializes an int8 into an Uint8Array.
 * @param value The int8 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int8 serialized in an Uint8Array.
 */
export function serializeInt8(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.INT8, options);
}

/**
 * Serializes an int16 into an Uint8Array.
 * @param value The int16 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int16 serialized in an Uint8Array.
 */
export function serializeInt16(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.INT16, options);
}

/**
 * Serializes an int32 into an Uint8Array.
 * @param value The int32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int32 serialized in an Uint8Array.
 */
export function serializeInt32(
    value: number,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.INT32, options);
}

/**
 * Serializes an int64 into an Uint8Array.
 * @param value The int64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int64 serialized in an Uint8Array.
 */
export function serializeInt64(
    value: bigint,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
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
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
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
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): Uint8Array {
    return serialize(value, NativeType.FLOAT64, options);
}

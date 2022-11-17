import { ByteifyDeserializationInvalidLengthError, ByteifyDeserializationWrongResultError } from '../errors';
import { NativeType } from '../types';
import { HANDLER, N_OF_BYTES } from '../values';
import { ByteifyEndianess, ByteifyOptions } from './types';

/**
 * Deserializes an Uint8Array representing a number.
 * @notExported
 * @category Helper
 * @param bytes The Uint8Array containing the bytes representing the number..
 * @param nativeType The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized number.
 */
function deserialize(bytes: Uint8Array, nativeType: NativeType, options: ByteifyOptions): number | bigint {
    const nOfBytes = N_OF_BYTES[nativeType];

    if (bytes.length !== nOfBytes) {
        throw new ByteifyDeserializationInvalidLengthError(
            `Invalid serialized ${nativeType}: it can be deserialized only by ${nOfBytes} byte`,
            nativeType,
            options.endianess,
            bytes,
            undefined
        );
    }

    if (options.endianess === ByteifyEndianess.BIG_ENDIAN) {
        bytes = bytes.slice().reverse();
    }

    const DeserializationClass = HANDLER[nativeType];
    const result = new DeserializationClass(bytes.buffer)[0];

    if (nativeType === NativeType.BOOL && result !== 0 && result !== 1) {
        throw new ByteifyDeserializationWrongResultError(
            'Invalid serialized boolean: it can be deserialized only in 1 or 0',
            nativeType,
            options.endianess,
            bytes,
            result
        );
    }

    return result;
}

/**
 * Deserializes an Uint8Array representing a boolean.
 * @param bytes The Uint8Array containing the bytes representing the boolean.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized boolean.
 */
export function deserializeBool(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): boolean {
    return deserialize(bytes, NativeType.BOOL, options) === 1;
}

/**
 * Deserializes an Uint8Array representing an uint8.
 * @param bytes The Uint8Array containing the bytes representing the uint8.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized uint8.
 */
export function deserializeUint8(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.UINT8, options) as number;
}

/**
 * Deserializes an Uint8Array representing an uint16.
 * @param bytes The Uint8Array containing the bytes representing the uint16.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized uint16.
 */
export function deserializeUint16(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.UINT16, options) as number;
}

/**
 * Deserializes an Uint8Array representing an uint32.
 * @param bytes The Uint8Array containing the bytes representing the uint32.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized uint32.
 */
export function deserializeUint32(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.UINT32, options) as number;
}

/**
 * Deserializes an Uint8Array representing an uint64.
 * @param bytes The Uint8Array containing the bytes representing the uint64.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized uint64.
 */
export function deserializeUint64(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): bigint {
    return deserialize(bytes, NativeType.UINT64, options) as bigint;
}

/**
 * Deserializes an Uint8Array representing an int8.
 * @param bytes The Uint8Array containing the bytes representing the int8.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized int8.
 */
export function deserializeInt8(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.INT8, options) as number;
}

/**
 * Deserializes an Uint8Array representing an int16.
 * @param bytes The Uint8Array containing the bytes representing the int16.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized int16.
 */
export function deserializeInt16(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.INT16, options) as number;
}

/**
 * Deserializes an Uint8Array representing an int32.
 * @param bytes The Uint8Array containing the bytes representing the int32.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized int32.
 */
export function deserializeInt32(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.INT32, options) as number;
}

/**
 * Deserializes an Uint8Array representing an int64.
 * @param bytes The Uint8Array containing the bytes representing the int64.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized int64.
 */
export function deserializeInt64(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): bigint {
    return deserialize(bytes, NativeType.INT64, options) as bigint;
}

/**
 * Deserializes an Uint8Array representing a float32.
 * @param bytes The Uint8Array containing the bytes representing the float32.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized float32.
 */
export function deserializeFloat32(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.FLOAT32, options) as number;
}

/**
 * Deserializes an Uint8Array representing a float64.
 * @param bytes The Uint8Array containing the bytes representing the float64.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized float64.
 */
export function deserializeFloat64(
    bytes: Uint8Array,
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number | bigint {
    return deserialize(bytes, NativeType.FLOAT64, options);
}

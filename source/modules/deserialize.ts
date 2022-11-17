import { ByteifyDeserializationInvalidLengthError, ByteifyDeserializationWrongResultError } from '../errors';
import { NativeType, ByteifyEndianess, ByteifyOptions } from '../types';
import { HANDLER, N_OF_BYTES } from '../values';

/**
 * Deserializes an array of bytes representing a number.
 * @notExported
 * @category Helper
 * @param bytes The array containing the bytes representing the number..
 * @param nativeType The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized number.
 */
function deserialize(bytes: number[], nativeType: NativeType, options: ByteifyOptions): number | bigint {
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

    const uint8ArrayToDeserialize =
        options.endianess === ByteifyEndianess.BIG_ENDIAN ? new Uint8Array(bytes).reverse() : new Uint8Array(bytes);

    const DeserializationClass = HANDLER[nativeType];
    const result = new DeserializationClass(uint8ArrayToDeserialize.buffer)[0];

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
 * Deserializes an array representing the bytes of a boolean.
 * @param bytes The array containing the bytes representing the boolean.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized boolean.
 */
export function deserializeBool(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): boolean {
    return deserialize(bytes, NativeType.BOOL, options) === 1;
}

/**
 * Deserializes an array representing the bytes of an uint8.
 * @param bytes The array containing the bytes representing the uint8.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized uint8.
 */
export function deserializeUint8(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.UINT8, options) as number;
}

/**
 * Deserializes an array representing the bytes of an uint16.
 * @param bytes The array containing the bytes representing the uint16.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized uint16.
 */
export function deserializeUint16(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.UINT16, options) as number;
}

/**
 * Deserializes an array representing the bytes of an uint32.
 * @param bytes The array containing the bytes representing the uint32.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized uint32.
 */
export function deserializeUint32(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.UINT32, options) as number;
}

/**
 * Deserializes an array representing the bytes of an uint64.
 * @param bytes The array containing the bytes representing the uint64.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized uint64.
 */
export function deserializeUint64(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): bigint {
    return deserialize(bytes, NativeType.UINT64, options) as bigint;
}

/**
 * Deserializes an array representing the bytes of an int8.
 * @param bytes The array containing the bytes representing the int8.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized int8.
 */
export function deserializeInt8(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.INT8, options) as number;
}

/**
 * Deserializes an array representing the bytes of an int16.
 * @param bytes The array containing the bytes representing the int16.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized int16.
 */
export function deserializeInt16(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.INT16, options) as number;
}

/**
 * Deserializes an array representing the bytes of an int32.
 * @param bytes The array containing the bytes representing the int32.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized int32.
 */
export function deserializeInt32(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.INT32, options) as number;
}

/**
 * Deserializes an array representing the bytes of an int64.
 * @param bytes The array containing the bytes representing the int64.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized int64.
 */
export function deserializeInt64(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): bigint {
    return deserialize(bytes, NativeType.INT64, options) as bigint;
}

/**
 * Deserializes an array representing the bytes of a float32.
 * @param bytes The array containing the bytes representing the float32.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized float32.
 */
export function deserializeFloat32(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number {
    return deserialize(bytes, NativeType.FLOAT32, options) as number;
}

/**
 * Deserializes an array representing the bytes of a float64.
 * @param bytes The array containing the bytes representing the float64.
 * @param options The [[ByteifyOptions]] to use to deserialize the array.
 * @returns The deserialized float64.
 */
export function deserializeFloat64(
    bytes: number[],
    options: ByteifyOptions = { endianess: ByteifyEndianess.BIG_ENDIAN }
): number | bigint {
    return deserialize(bytes, NativeType.FLOAT64, options);
}

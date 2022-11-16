import * as limits from '../values/constants';
import { ByteifyCase, ByteifyOptions } from './types';

/**
 * Deserializes an Uint8Array representing an integer into a number.
 * @notExported
 * @category Helper
 * @param bytes The Uint8Array containing the bytes representing an integer.
 * @param type The type that is being to be analyzed. It will be used also to take the limits.
 * @param unsigned If the Uint8Array is representing an unsigned integer.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized number.
 */
function deserializeInteger(bytes: Uint8Array, type: string, unsigned: boolean, options: ByteifyOptions): number {
    const nOfBytes: number = limits.N_OF_BYTES[type];
    const max: number = limits.MAX[type];
    const min: number = limits.MIN[type];

    if (bytes.length !== nOfBytes) {
        throw new Error(`Invalid serialized ${type}: it can be deserialized only by ${nOfBytes} byte`);
    }

    if (options.type === ByteifyCase.LITTLE_ENDIAN) {
        bytes = bytes.slice().reverse();
    }

    let bits = Array.from(bytes)
        .map(bs => Array.from(bs.toString(2).padStart(8)).map(c => +c))
        .flat(1);

    if (!unsigned) bits[0] *= -1;

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const value = bits.reverse().reduce((a, b, i) => a + (b === 0 ? 0 : b * 2 ** i), 0);

    /* c8 ignore start */
    if (value < min) {
        throw new Error(
            `Invalid serialized ${type}: it can be deserialized only if value is greater or equal to ${min}`
        );
    }
    if (value > max) {
        throw new Error(`Invalid serialized ${type}: it can be deserialized only if value is lower or equal to ${max}`);
    }
    /* c8 ignore stop */

    return value;
}

/**
 * Deserializes an Uint8Array representing a decimal into a number.
 * @notExported * @category Helper * @category Helper * @category Helper
 * @category Helper
 * @param bytes The Uint8Array containing the bytes representing a decimal.
 * @param type The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized number.
 */
function deserializeDecimal(bytes: Uint8Array, type: string, options: ByteifyOptions): number {
    const nOfBytes: number = limits.N_OF_BYTES[type];
    const max: number = limits.MAX[type];
    const min: number = limits.MIN[type];

    if (bytes.length !== nOfBytes) {
        throw new Error(`Invalid serialized ${type}: it can be deserialized only by ${nOfBytes} byte`);
    }

    if (options.type === ByteifyCase.LITTLE_ENDIAN) {
        bytes = bytes.slice().reverse();
    }

    const value = +new (nOfBytes === 4 ? Float32Array : Float64Array)(bytes.buffer);

    /* c8 ignore start */
    if (value < min) {
        throw new Error(
            `Invalid serialized ${type}: it can be deserialized only if value is greater or equal to ${min}`
        );
    }
    if (value > max) {
        throw new Error(`Invalid serialized ${type}: it can be deserialized only if value is lower or equal to ${max}`);
    }
    /* c8 ignore stop */

    return value;
}

/**
 * Deserializes an Uint8Array representing a boolean.
 * @param bytes The Uint8Array containing the bytes representing the boolean.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized boolean.
 */
export function deserializeBool(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): boolean {
    return deserializeInteger(bytes, 'bool', true, options) === 1;
}

/**
 * Deserializes an Uint8Array representing an uint8.
 * @param bytes The Uint8Array containing the bytes representing the uint8.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized uint8.
 */
export function deserializeUint8(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeInteger(bytes, 'uint8', true, options);
}

/**
 * Deserializes an Uint8Array representing an uint16.
 * @param bytes The Uint8Array containing the bytes representing the uint16.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized uint16.
 */
export function deserializeUint16(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeInteger(bytes, 'uint16', true, options);
}

/**
 * Deserializes an Uint8Array representing an uint32.
 * @param bytes The Uint8Array containing the bytes representing the uint32.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized uint32.
 */
export function deserializeUint32(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeInteger(bytes, 'uint32', true, options);
}

/**
 * Deserializes an Uint8Array representing an uint64.
 * @param bytes The Uint8Array containing the bytes representing the uint64.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized uint64.
 */
export function deserializeUint64(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeInteger(bytes, 'uint64', true, options);
}

/**
 * Deserializes an Uint8Array representing an int8.
 * @param bytes The Uint8Array containing the bytes representing the int8.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized int8.
 */
export function deserializeInt8(bytes: Uint8Array, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): number {
    return deserializeInteger(bytes, 'int8', false, options);
}

/**
 * Deserializes an Uint8Array representing an int16.
 * @param bytes The Uint8Array containing the bytes representing the int16.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized int16.
 */
export function deserializeInt16(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeInteger(bytes, 'int16', false, options);
}

/**
 * Deserializes an Uint8Array representing an int32.
 * @param bytes The Uint8Array containing the bytes representing the int32.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized int32.
 */
export function deserializeInt32(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeInteger(bytes, 'int32', false, options);
}

/**
 * Deserializes an Uint8Array representing an int64.
 * @param bytes The Uint8Array containing the bytes representing the int64.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized int64.
 */
export function deserializeInt64(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeInteger(bytes, 'int64', false, options);
}

/**
 * Deserializes an Uint8Array representing a float32.
 * @param bytes The Uint8Array containing the bytes representing the float32.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized float32.
 */
export function deserializeFloat32(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeDecimal(bytes, 'float32', options);
}

/**
 * Deserializes an Uint8Array representing a float64.
 * @param bytes The Uint8Array containing the bytes representing the float64.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The deserialized float64.
 */
export function deserializeFloat64(
    bytes: Uint8Array,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): number {
    return deserializeDecimal(bytes, 'float64', options);
}

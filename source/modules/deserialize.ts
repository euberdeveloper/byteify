import * as limits from './limits';

/**
 * Deserializes an Uint8Array representing an integer into a number.
 * @param bytes The Uint8Array containing the bytes representing an integer.
 * @param nOfBytes The number of bytes of the represented integer.
 * @param min The minimum value that that integer can assume.
 * @param max The maximum value that that integer can assume.
 * @param unsigned If the Uint8Array is representing an unsigned integer.
 * @param title The title of the type represented by the Uint8Array.
 * @returns The deserialized number.
 */
function deserializeInteger(bytes: Uint8Array, nOfBytes: number, min: number, max: number, unsigned: boolean, title: string): number {
    if (bytes.length !== nOfBytes) {
        throw new Error(`Invalid serialized ${title}: it can be deserialized only by ${nOfBytes} byte`);
    }

    const value = ((unsigned ? bytes : new Int8Array(bytes.buffer)) as any).reduceRight((result: number, current: number, index: number) => result + current >> (index * 8), 0);

    if (value < min) {
        throw new Error(`Invalid serialized ${title}: it can be deserialized only if value is greater or equal to ${min}`);
    }
    if (value > max) {
        throw new Error(`Invalid serialized ${title}: it can be deserialized only if value is lower or equal to ${max}`);
    }

    return value;
}

/**
 * Deserializes an Uint8Array representing a decimal into a number.
 * @param bytes The Uint8Array containing the bytes representing a decimal.
 * @param nOfBytes The number of bytes of the represented decimal.
 * @param min The minimum value that that decimal can assume.
 * @param max The maximum value that that decimal can assume.
 * @param title The title of the type represented by the Uint8Array.
 * @returns The deserialized number.
 */
function deserializeDecimal(bytes: Uint8Array, nOfBytes: number, min: number, max: number, title: string): number {
    if (bytes.length !== nOfBytes) {
        throw new Error(`Invalid serialized ${title}: it can be deserialized only by ${nOfBytes} byte`);
    }

    const value = bytes.reduceRight((result, current, index) => result + current >> (index * 8));

    if (value < min) {
        throw new Error(`Invalid serialized ${title}: it can be deserialized only if value is greater or equal to ${min}`);
    }
    if (value > max) {
        throw new Error(`Invalid serialized ${title}: it can be deserialized only if value is lower or equal to ${max}`);
    }

    return +(new (nOfBytes === 4 ? Float32Array : Float64Array)(bytes.buffer));
}

/**
 * Deserializes an Uint8Array representing a boolean.
 * @param bytes The Uint8Array containing the bytes representing the boolean.
 * @returns The deserialized boolean.
 */
export function deserializeBool(bytes: Uint8Array): boolean {
    return deserializeInteger(bytes, limits.N_OF_BYTES.BOOL, limits.MIN.BOOL, limits.MAX.BOOL, true, 'bool') === 1;
}

/**
 * Deserializes an Uint8Array representing an uint8.
 * @param bytes The Uint8Array containing the bytes representing the uint8.
 * @returns The deserialized uint8.
 */
export function deserializeUint8(bytes: Uint8Array): number {
    return deserializeInteger(bytes, limits.N_OF_BYTES.UINT8, limits.MIN.UINT8, limits.MAX.UINT8, true, 'uint8');
}

/**
 * Deserializes an Uint8Array representing an uint16.
 * @param bytes The Uint8Array containing the bytes representing the uint16.
 * @returns The deserialized uint16.
 */
export function deserializeUint16(bytes: Uint8Array): number {
    return deserializeInteger(bytes, limits.N_OF_BYTES.UINT16, limits.MIN.UINT16, limits.MAX.UINT16, true, 'uint16');
}

/**
 * Deserializes an Uint8Array representing an uint32.
 * @param bytes The Uint8Array containing the bytes representing the uint32.
 * @returns The deserialized uint32.
 */
export function deserializeUint32(bytes: Uint8Array): number {
    return deserializeInteger(bytes, limits.N_OF_BYTES.UINT32, limits.MIN.UINT32, limits.MAX.UINT32, true, 'uint32');
}

/**
 * Deserializes an Uint8Array representing an uint64.
 * @param bytes The Uint8Array containing the bytes representing the uint64.
 * @returns The deserialized uint64.
 */
export function deserializeUint64(bytes: Uint8Array): number {
    return deserializeInteger(bytes, limits.N_OF_BYTES.UINT64, limits.MIN.UINT64, limits.MAX.UINT64, true, 'uint64');
}

/**
 * Deserializes an Uint8Array representing an int8.
 * @param bytes The Uint8Array containing the bytes representing the int8.
 * @returns The deserialized int8.
 */
export function deserializeInt8(bytes: Uint8Array): number {
    return deserializeInteger(bytes, limits.N_OF_BYTES.INT8, limits.MIN.INT8, limits.MAX.INT8, false, 'uint8');
}

/**
 * Deserializes an Uint8Array representing an int16.
 * @param bytes The Uint8Array containing the bytes representing the int16.
 * @returns The deserialized int16.
 */
export function deserializeInt16(bytes: Uint8Array): number {
    return deserializeInteger(bytes, limits.N_OF_BYTES.INT16, limits.MIN.INT16, limits.MAX.INT16, false, 'uint16');
}

/**
 * Deserializes an Uint8Array representing an int32.
 * @param bytes The Uint8Array containing the bytes representing the int32.
 * @returns The deserialized int32.
 */
export function deserializeInt32(bytes: Uint8Array): number {
    return deserializeInteger(bytes, limits.N_OF_BYTES.INT32, limits.MIN.INT32, limits.MAX.INT32, false, 'uint32');
}

/**
 * Deserializes an Uint8Array representing an int64.
 * @param bytes The Uint8Array containing the bytes representing the int64.
 * @returns The deserialized int64.
 */
export function deserializeInt64(bytes: Uint8Array): number {
    return deserializeInteger(bytes, limits.N_OF_BYTES.INT64, limits.MIN.INT64, limits.MAX.INT64, false, 'uint64');
}

/**
 * Deserializes an Uint8Array representing a float32.
 * @param bytes The Uint8Array containing the bytes representing the float32.
 * @returns The deserialized float32.
 */
export function deserializeFloat32(bytes: Uint8Array): number {
    return deserializeDecimal(bytes, limits.N_OF_BYTES.FLOAT32, limits.MIN.FLOAT32, limits.MAX.FLOAT32, 'float32')
}

/**
 * Deserializes an Uint8Array representing a float64.
 * @param bytes The Uint8Array containing the bytes representing the float64.
 * @returns The deserialized float64.
 */
export function deserializeFloat64(bytes: Uint8Array): number {
    return deserializeDecimal(bytes, limits.N_OF_BYTES.FLOAT64, limits.MIN.FLOAT64, limits.MAX.FLOAT64, 'float64')
}
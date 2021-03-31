import * as limits from './limits';

/**
 * Serializes an integer into an Uint8Array.
 * @param value The number to serialize.
 * @param nOfBytes The number of bytes of the represented integer.
 * @param min The minimum value that that integer can assume.
 * @param max The maximum value that that integer can assume.
 * @param title The title of the type that will be serialized.
 * @returns The serialized Uint8Array.
 */
function serializeInteger(value: number, nOfBytes: number, min: number, max: number, title: string): Uint8Array {
    if (typeof value !== 'number') {
        throw new Error(`Invalid ${title}: value must be a number`);
    }
    if (value < min) {
        throw new Error(`Invalid ${title}: value cannot be lower than ${min}`);
    }
    if (value > max) {
        throw new Error(`Invalid ${title}: value cannot be bigger than ${max}`);
    }
    if (value % 1 !== 0) {
        throw new Error(`Invalid ${title}: value cannot be decimal`);
    }

    const result = new Uint8Array(nOfBytes);
    const offsetBase = nOfBytes - 1;
    [Array(nOfBytes)].forEach((_, index) => {
        result.set([(value >> (8 * (offsetBase - index))) & 0xff], index);
    });
    return result;
}

/**
 * Serializes a decimal into an Uint8Array.
 * @param value The number to serialize.
 * @param nOfBytes The number of bytes of the represented decimal.
 * @param min The minimum value that that decimal can assume.
 * @param max The maximum value that that decimal can assume.
 * @param title The title of the type that will be serialized.
 * @returns The serialized bytes of the Uint8Array.
 */
function serializeDecimal(value: number, nOfBytes: number, min: number, max: number, title: string): Uint8Array {
    if (typeof value !== 'number') {
        throw new Error(`Invalid ${title}: value must be a number`);
    }
    if (value < min) {
        throw new Error(`Invalid ${title}: value cannot be lower than ${min}`);
    }
    if (value > max) {
        throw new Error(`Invalid ${title}: value cannot be bigger than ${max}`);
    }

    const result = new Uint8Array(new (nOfBytes === 4 ? Float32Array : Float64Array)([value]).buffer);

    if (result.length !== nOfBytes) {
        throw new Error(`Invalid ${title}: value must be of ${nOfBytes} bytes`);
    }

    return result;
}

/**
 * Serializes a boolean into an Uint8Array.
 * @param value The boolean to serialize.
 * @returns The boolean serialized in an Uint8Array.
 */
export function serializeBool(value: boolean): Uint8Array {
    return serializeInteger(+value, limits.N_OF_BYTES.BOOL, limits.MIN.BOOL, limits.MAX.BOOL, 'bool');
}

/**
 * Serializes an uint8 into an Uint8Array.
 * @param value The uint8 to serialize.
 * @returns The uint8 serialized in an Uint8Array.
 */
export function serializeUint8(value: number): Uint8Array {
    return serializeInteger(value, limits.N_OF_BYTES.UINT8, limits.MIN.UINT8, limits.MAX.UINT8, 'uint8');
}

/**
 * Serializes an uint16 into an Uint8Array.
 * @param value The uint16 to serialize.
 * @returns The uint16 serialized in an Uint8Array.
 */
export function serializeUint16(value: number): Uint8Array {
    return serializeInteger(value, limits.N_OF_BYTES.UINT16, limits.MIN.UINT16, limits.MAX.UINT16, 'uint16');
}

/**
 * Serializes an uint32 into an Uint8Array.
 * @param value The uint32 to serialize.
 * @returns The uint32 serialized in an Uint8Array.
 */
export function serializeUint32(value: number): Uint8Array {
    return serializeInteger(value, limits.N_OF_BYTES.UINT32, limits.MIN.UINT32, limits.MAX.UINT32, 'uint32');
}

/**
 * Serializes an uint64 into an Uint8Array.
 * @param value The uint64 to serialize.
 * @returns The uint64 serialized in an Uint8Array.
 */
export function serializeUint64(value: number): Uint8Array {
    return serializeInteger(value, limits.N_OF_BYTES.UINT64, limits.MIN.UINT64, limits.MAX.UINT64, 'uint64');
}

/**
 * Serializes an int8 into an Uint8Array.
 * @param value The int8 to serialize.
 * @returns The int8 serialized in an Uint8Array.
 */
export function serializeInt8(value: number): Uint8Array {
    return serializeInteger(value, limits.N_OF_BYTES.INT8, limits.MIN.INT8, limits.MAX.INT8, 'uint8');
}

/**
 * Serializes an int16 into an Uint8Array.
 * @param value The int16 to serialize.
 * @returns The int16 serialized in an Uint8Array.
 */
export function serializeInt16(value: number): Uint8Array {
    return serializeInteger(value, limits.N_OF_BYTES.INT16, limits.MIN.INT16, limits.MAX.INT16, 'uint16');
}

/**
 * Serializes an int32 into an Uint8Array.
 * @param value The int32 to serialize.
 * @returns The int32 serialized in an Uint8Array.
 */
export function serializeInt32(value: number): Uint8Array {
    return serializeInteger(value, limits.N_OF_BYTES.INT32, limits.MIN.INT32, limits.MAX.INT32, 'uint32');
}

/**
 * Serializes an int64 into an Uint8Array.
 * @param value The int64 to serialize.
 * @returns The int64 serialized in an Uint8Array.
 */
export function serializeInt64(value: number): Uint8Array {
    return serializeInteger(value, limits.N_OF_BYTES.INT64, limits.MIN.INT64, limits.MAX.INT64, 'uint64');
}

/**
 * Serializes a float32 into an Uint8Array.
 * @param value The float32 to serialize.
 * @returns The float32 serialized in an Uint8Array.
 */
export function serializeFloat32(value: number): Uint8Array {
    return serializeDecimal(value, limits.N_OF_BYTES.FLOAT32, limits.MIN.FLOAT32, limits.MAX.FLOAT32, 'float32');
}

/**
 * Serializes a float64 into an Uint8Array.
 * @param value The float64 to serialize.
 * @returns The float64 serialized in an Uint8Array.
 */
export function serializeFloat64(value: number): Uint8Array {
    return serializeDecimal(value, limits.N_OF_BYTES.FLOAT64, limits.MIN.FLOAT64, limits.MAX.FLOAT64, 'float64');
}

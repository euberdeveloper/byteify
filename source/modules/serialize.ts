import * as limits from './limits';

/**
 * Serializes an integer into an Uint8Array.
 * @param value The number to serialize.
 * @param type The type that is being to be analyzed. It will be used also to take the limits.
 * @returns The serialized Uint8Array.
 */
function serializeInteger(value: number, type: string): Uint8Array {
    const nOfBytes: number = limits.N_OF_BYTES[type];
    const max: number = limits.MAX[type];
    const min: number = limits.MIN[type];

    if (typeof value !== 'number') {
        throw new Error(`Invalid ${type}: value must be a number`);
    }
    if (value < min) {
        throw new Error(`Invalid ${type}: value cannot be lower than ${min}`);
    }
    if (value > max) {
        throw new Error(`Invalid ${type}: value cannot be bigger than ${max}`);
    }
    if (value % 1 !== 0) {
        throw new Error(`Invalid ${type}: value cannot be decimal`);
    }

    const result = new Uint8Array(nOfBytes);
    const offsetBase = nOfBytes - 1;
    console.log({offsetBase, nOfBytes, type});
    [Array(nOfBytes)].forEach((_, index) => {
        result.set([(value >> (8 * (offsetBase - index))) & 0xff], index);
    });
    return result;
}

/**
 * Serializes a decimal into an Uint8Array.
 * @param value The number to serialize.
 * @param type The type that is being to be analyzed. It will be used also to take the limits.
 * @returns The serialized bytes of the Uint8Array.
 */
function serializeDecimal(value: number, type: string): Uint8Array {
    const nOfBytes: number = limits.N_OF_BYTES[type];
    const max: number = limits.MAX[type];
    const min: number = limits.MIN[type];

    if (typeof value !== 'number') {
        throw new Error(`Invalid ${type}: value must be a number`);
    }
    if (value < min) {
        throw new Error(`Invalid ${type}: value cannot be lower than ${min}`);
    }
    if (value > max) {
        throw new Error(`Invalid ${type}: value cannot be bigger than ${max}`);
    }

    const result = new Uint8Array(new (nOfBytes === 4 ? Float32Array : Float64Array)([value]).buffer);

    if (result.length !== nOfBytes) {
        throw new Error(`Invalid ${type}: value must be of ${nOfBytes} bytes`);
    }

    return result;
}

/**
 * Serializes a boolean into an Uint8Array.
 * @param value The boolean to serialize.
 * @returns The boolean serialized in an Uint8Array.
 */
export function serializeBool(value: boolean): Uint8Array {
    return serializeInteger(+value, 'bool');
}

/**
 * Serializes an uint8 into an Uint8Array.
 * @param value The uint8 to serialize.
 * @returns The uint8 serialized in an Uint8Array.
 */
export function serializeUint8(value: number): Uint8Array {
    return serializeInteger(value, 'uint8');
}

/**
 * Serializes an uint16 into an Uint8Array.
 * @param value The uint16 to serialize.
 * @returns The uint16 serialized in an Uint8Array.
 */
export function serializeUint16(value: number): Uint8Array {
    return serializeInteger(value, 'uint16');
}

/**
 * Serializes an uint32 into an Uint8Array.
 * @param value The uint32 to serialize.
 * @returns The uint32 serialized in an Uint8Array.
 */
export function serializeUint32(value: number): Uint8Array {
    return serializeInteger(value, 'uint32');
}

/**
 * Serializes an uint64 into an Uint8Array.
 * @param value The uint64 to serialize.
 * @returns The uint64 serialized in an Uint8Array.
 */
export function serializeUint64(value: number): Uint8Array {
    return serializeInteger(value, 'uint64');
}

/**
 * Serializes an int8 into an Uint8Array.
 * @param value The int8 to serialize.
 * @returns The int8 serialized in an Uint8Array.
 */
export function serializeInt8(value: number): Uint8Array {
    return serializeInteger(value, 'int8');
}

/**
 * Serializes an int16 into an Uint8Array.
 * @param value The int16 to serialize.
 * @returns The int16 serialized in an Uint8Array.
 */
export function serializeInt16(value: number): Uint8Array {
    return serializeInteger(value, 'int16');
}

/**
 * Serializes an int32 into an Uint8Array.
 * @param value The int32 to serialize.
 * @returns The int32 serialized in an Uint8Array.
 */
export function serializeInt32(value: number): Uint8Array {
    return serializeInteger(value, 'int32');
}

/**
 * Serializes an int64 into an Uint8Array.
 * @param value The int64 to serialize.
 * @returns The int64 serialized in an Uint8Array.
 */
export function serializeInt64(value: number): Uint8Array {
    return serializeInteger(value, 'int64');
}

/**
 * Serializes a float32 into an Uint8Array.
 * @param value The float32 to serialize.
 * @returns The float32 serialized in an Uint8Array.
 */
export function serializeFloat32(value: number): Uint8Array {
    return serializeDecimal(value, 'float32');
}

/**
 * Serializes a float64 into an Uint8Array.
 * @param value The float64 to serialize.
 * @returns The float64 serialized in an Uint8Array.
 */
export function serializeFloat64(value: number): Uint8Array {
    return serializeDecimal(value, 'float64');
}

import * as limits from './limits';
import { ByteifyCase, ByteifyOptions } from './types';

/**
 * Serializes a 32 bit integer into an Uint8Array.
 * @notExported
 * @category Helper
 * @param value The number to serialize
 * @param nOfBytes The resulting number of bytes
 * @returns The serialized Uint8Array
 */
function serialize32BitInteger(value: number, nOfBytes: number): Uint8Array {
    const result = new Uint8Array(nOfBytes);
    const offsetBase = nOfBytes - 1;

    [...Array(nOfBytes)].forEach((_, index) => {
        result.set([(value >> (8 * (offsetBase - index))) & 0xff], index);
    });

    return result;
}

/**
 * Serializes an integer into an Uint8Array.
 * @notExported
 * @category Helper
 * @param value The number to serialize.
 * @param type The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The serialized Uint8Array.
 */
function serializeInteger(value: number, type: string, options: ByteifyOptions): Uint8Array {
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

    let result: Uint8Array;

    const firstResult = serialize32BitInteger(value % 2 ** 32, Math.min(nOfBytes, 4));
    if (nOfBytes <= 4) {
        result = firstResult;
    } else {
        result = new Uint8Array(nOfBytes);
        const secondResult = serialize32BitInteger(Math.floor(value / 2 ** 32), nOfBytes - 4);
        result.set(secondResult);
        result.set(firstResult, secondResult.length);
    }

    if (options.type === ByteifyCase.LITTLE_ENDIAN) {
        result.reverse();
    }

    return result;
}

/**
 * Serializes a decimal into an Uint8Array.
 * @notExported
 * @category Helper
 * @param value The number to serialize.
 * @param type The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The serialized bytes of the Uint8Array.
 */
function serializeDecimal(value: number, type: string, options: ByteifyOptions): Uint8Array {
    const nOfBytes: number = limits.N_OF_BYTES[type];
    const max: number = limits.MAX[type];
    const min: number = limits.MIN[type];

    if (typeof value !== 'number') {
        throw new Error(`Invalid ${type}: value must be a number`);
    }
    /* istanbul ignore next */
    if (value < min) {
        throw new Error(`Invalid ${type}: value cannot be lower than ${min}`);
    }
    /* istanbul ignore next */
    if (value > max) {
        throw new Error(`Invalid ${type}: value cannot be bigger than ${max}`);
    }

    const result = new Uint8Array(new (nOfBytes === 4 ? Float32Array : Float64Array)([value]).buffer);

    if (options.type === ByteifyCase.LITTLE_ENDIAN) {
        result.reverse();
    }

    return result;
}

/**
 * Serializes a boolean into an Uint8Array.
 * @param value The boolean to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The boolean serialized in an Uint8Array.
 */
export function serializeBool(value: boolean, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(+value, 'bool', options);
}

/**
 * Serializes an uint8 into an Uint8Array.
 * @param value The uint8 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint8 serialized in an Uint8Array.
 */
export function serializeUint8(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(value, 'uint8', options);
}

/**
 * Serializes an uint16 into an Uint8Array.
 * @param value The uint16 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint16 serialized in an Uint8Array.
 */
export function serializeUint16(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(value, 'uint16', options);
}

/**
 * Serializes an uint32 into an Uint8Array.
 * @param value The uint32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint32 serialized in an Uint8Array.
 */
export function serializeUint32(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(value, 'uint32', options);
}

/**
 * Serializes an uint64 into an Uint8Array.
 * @param value The uint64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The uint64 serialized in an Uint8Array.
 */
export function serializeUint64(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(value, 'uint64', options);
}

/**
 * Serializes an int8 into an Uint8Array.
 * @param value The int8 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int8 serialized in an Uint8Array.
 */
export function serializeInt8(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(value, 'int8', options);
}

/**
 * Serializes an int16 into an Uint8Array.
 * @param value The int16 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int16 serialized in an Uint8Array.
 */
export function serializeInt16(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(value, 'int16', options);
}

/**
 * Serializes an int32 into an Uint8Array.
 * @param value The int32 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int32 serialized in an Uint8Array.
 */
export function serializeInt32(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(value, 'int32', options);
}

/**
 * Serializes an int64 into an Uint8Array.
 * @param value The int64 to serialize.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The int64 serialized in an Uint8Array.
 */
export function serializeInt64(value: number, options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }): Uint8Array {
    return serializeInteger(value, 'int64', options);
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
    return serializeDecimal(value, 'float32', options);
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
    return serializeDecimal(value, 'float64', options);
}

import * as limits from './limits';
import { ByteifyCase, ByteifyOptions } from './types';

/**
 * A type aliasing the general class of the relative indexables.
 */
type RelativeIndexableClass<T> = {
    new (arr?: T[]): RelativeIndexable<T> & {
        buffer: ArrayBufferLike;
    };
};

/**
 * Serializes an integer into an Uint8Array.
 * @notExported
 * @category Helper
 * @param value The number to serialize.
 * @param numberType The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The serialized Uint8Array.
 */
function serializeInteger(value: number, numberType: string, options: ByteifyOptions): Uint8Array {
    const max: number = limits.MAX[numberType];
    const min: number = limits.MIN[numberType];

    if (typeof value !== 'number') {
        throw new Error(`Invalid ${numberType}: value must be a number`);
    }
    if (value < min) {
        throw new Error(`Invalid ${numberType}: value cannot be lower than ${min}`);
    }
    if (value > max) {
        throw new Error(`Invalid ${numberType}: value cannot be bigger than ${max}`);
    }
    if (value % 1 !== 0) {
        throw new Error(`Invalid ${numberType}: value cannot be decimal`);
    }

    let SerializationClass: RelativeIndexableClass<number>;
    switch (numberType) {
        case 'bool':
        case 'uint8':
            SerializationClass = Uint8Array;
            break;
        case 'uint16':
            SerializationClass = Uint16Array;
            break;
        case 'uint32':
            SerializationClass = Uint32Array;
            break;
        case 'int8':
            SerializationClass = Int8Array;
            break;
        case 'int16':
            SerializationClass = Int16Array;
            break;
        case 'int32':
            SerializationClass = Int32Array;
            break;
        default:
            throw new Error(`Invalid ${numberType}: type not supported`);
    }

    const result = new Uint8Array(new SerializationClass([value]).buffer);
    return options.type === ByteifyCase.LITTLE_ENDIAN ? result : result.reverse();
}

/**
 * Serializes a big integer or number into an Uint8Array.
 * @notExported
 * @category Helper
 * @param value The big integer to serialize.
 * @param numberType The type that is being to be analyzed. It will be used also to take the limits.
 * @param options The [[ByteifyOptions]] to use to deserialize the Uint8Array.
 * @returns The serialized Uint8Array.
 */
function serializeBigInteger(value: number | bigint, numberType: string, options: ByteifyOptions): Uint8Array {
    const max: number = limits.MAX[numberType];
    const min: number = limits.MIN[numberType];

    if (typeof value === 'number') {
        if (value % 1 !== 0) {
            throw new Error(`Invalid ${numberType}: value cannot be decimal`);
        }
        value = BigInt(value);
    }

    if (typeof value !== 'bigint') {
        throw new Error(`Invalid ${numberType}: value must be a number`);
    }
    if (value < min) {
        throw new Error(`Invalid ${numberType}: value cannot be lower than ${min}`);
    }
    if (value > max) {
        throw new Error(`Invalid ${numberType}: value cannot be bigger than ${max}`);
    }

    const SerializationClass = numberType === 'uint64' ? BigUint64Array : BigInt64Array;

    const result = new Uint8Array(new SerializationClass([value]).buffer);
    return options.type === ByteifyCase.LITTLE_ENDIAN ? result : result.reverse();
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
export function serializeUint64(
    value: number | bigint,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): Uint8Array {
    return serializeBigInteger(value, 'uint64', options);
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
export function serializeInt64(
    value: number | bigint,
    options: ByteifyOptions = { type: ByteifyCase.BIG_ENDIAN }
): Uint8Array {
    return serializeBigInteger(value, 'int64', options);
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

import { Essence, NativeType } from '../types';

/**
 * The max value that a certain native type can assume
 */
export const MAX = {
    bool: 1,
    uint8: 255,
    uint16: 65535,
    uint32: 4294967295,
    uint64: 18446744073709551616n,
    int8: 127,
    int16: 32767,
    int32: 2147483647,
    int64: 9223372036854775807n,
    float32: Number.MAX_VALUE,
    float64: Number.MAX_VALUE
};

/**
 * The min value that a certain native type can assume.
 */
export const MIN = {
    bool: 0,
    uint8: 0,
    uint16: 0,
    uint32: 0,
    uint64: 0,
    int8: -128,
    int16: -32768,
    int32: -2147483648,
    int64: -9223372036854775808n,
    float32: -Number.MAX_VALUE,
    float64: -Number.MAX_VALUE
};

/**
 * The number of bytes that a certain native type has.
 */
export const N_OF_BYTES = {
    bool: 1,
    uint8: 1,
    uint16: 2,
    uint32: 4,
    uint64: 8,
    int8: 1,
    int16: 2,
    int32: 4,
    int64: 8,
    float32: 4,
    float64: 8
};

/**
 * The class that handles a certain native type.
 */
export const HANDLER: Record<NativeType, any> = {
    bool: Uint8Array,
    uint8: Uint8Array,
    uint16: Uint16Array,
    uint32: Uint32Array,
    uint64: BigUint64Array,
    int8: Int8Array,
    int16: Int16Array,
    int32: Int32Array,
    int64: BigInt64Array,
    float32: Float32Array,
    float64: Float64Array
};

/**
 * The base type that a certain native type consists in.
 */
export const ESSENCE = {
    bool: Essence.INT,
    uint8: Essence.INT,
    uint16: Essence.INT,
    uint32: Essence.INT,
    uint64: Essence.BIGINT,
    int8: Essence.INT,
    int16: Essence.INT,
    int32: Essence.INT,
    int64: Essence.BIGINT,
    float32: Essence.DECIMAL,
    float64: Essence.DECIMAL
};

/**
 * The supported types for a certain essence.
 */
export const SUPPORTED_TYPES = {
    int: ['number'],
    bigint: ['number', 'bigint'],
    decimal: ['number']
};

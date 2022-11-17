import { Essence, NativeType } from '../types';

/**
 * The max value that a certain native type can assume
 */
export const MAX = {
    bool: 1,
    uint8: 255,
    uint16: 65_535,
    uint32: 4_294_967_295,
    uint64: 18_446_744_073_709_551_616n,
    int8: 127,
    int16: 32_767,
    int32: 2_147_483_647,
    int64: 9_223_372_036_854_775_807n,
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
    uint64: 0n,
    int8: -128,
    int16: -32_768,
    int32: -2_147_483_648,
    int64: -9_223_372_036_854_775_808n,
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
 * The limits (max, min, n. of bytes) of a certain native type.
 */
export const limits = {
    MAX,
    MIN,
    N_OF_BYTES
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
export const SUPPORTED_TYPE = {
    int: 'number',
    bigint: 'bigint',
    decimal: 'number'
};

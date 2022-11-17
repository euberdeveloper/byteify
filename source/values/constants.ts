import { Essence, NativeType } from '../types';

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

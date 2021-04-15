/**
 * Interface of the description of a native type feature.
 */
export interface TypesDescription {
    bool: number;
    uint8: number;
    uint16: number;
    uint32: number;
    uint64: number;
    int8: number;
    int16: number;
    int32: number;
    int64: number;
    float32: number;
    float64: number;
}

/**
 * The max value that a certain native type can assume.
 * Note: due to js limitations, int64 and float64 have more restricted limits.
 */
export const MAX: TypesDescription = Object.freeze({
    bool: 1,
    uint8: 255,
    uint16: 65535,
    uint32: 4294967295,
    uint64: Number.MAX_VALUE, // Note: problem because max value in js has 53 precision and not 64
    int8: 127,
    int16: 32767,
    int32: 2147483647,
    int64: Number.MAX_VALUE, // Note: problem because max value in js has 53 precision and not 64,
    float32: Number.MAX_VALUE, // TODO
    float64: Number.MAX_VALUE // TODO
});

/**
 * The min value that a certain native type can assume.
 * Note: due to js limitations, int64 and float64 have more restricted limits.
 */
export const MIN: TypesDescription = Object.freeze({
    bool: 0,
    uint8: 0,
    uint16: 0,
    uint32: 0,
    uint64: 0,
    int8: -128,
    int16: -32768,
    int32: -2147483648,
    int64: -9007199254740991, // Note: problem because max value in js has 53 precision and not 64,
    float32: -9007199254740991, // TODO
    float64: -9007199254740991 // TODO
});

/**
 * The number of bytes of a certain native.
 */
export const N_OF_BYTES: TypesDescription = Object.freeze({
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
});

export const TYPE_OF_ARRAY = Object.freeze({
    bool: Uint8Array,
    uint8: Uint8Array,
    uint16: Uint16Array,
    uint32: Uint8Array,
    uint64: Uint8Array,
    int8: Uint8Array,
    int16: Uint8Array,
    int32: Uint8Array,
    int64: Uint8Array,
    float32: Uint8Array,
    float64: Uint8Array
});

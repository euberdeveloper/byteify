/**
 * Interface of the description of a native type feature.
 */
interface TypesDescription {
    BOOL: number;
    UINT8: number;
    UINT16: number;
    UINT32: number;
    UINT64: number;
    INT8: number;
    INT16: number;
    INT32: number;
    INT64: number;
    FLOAT32: number;
    FLOAT64: number;
}

/**
 * The max value that a certain native type can assume.
 * Note: due to js limitations, int64 and float64 have more restricted limits.
 */
export const MAX: TypesDescription = {
    BOOL: 1,
    UINT8: 255,
    UINT16: 65535,
    UINT32: 4294967295,
    UINT64: Number.MAX_VALUE, // Note: problem because max value in js has 53 precision and not 64
    INT8: 127,
    INT16: 32767,
    INT32: 2147483647,
    INT64: Number.MAX_VALUE, // Note: problem because max value in js has 53 precision and not 64,
    FLOAT32: Number.MAX_VALUE, // TODO
    FLOAT64: Number.MAX_VALUE // TODO
};

/**
 * The min value that a certain native type can assume.
 * Note: due to js limitations, int64 and float64 have more restricted limits.
 */
export const MIN: TypesDescription = {
    BOOL: 0,
    UINT8: 0,
    UINT16: 0,
    UINT32: 0,
    UINT64: 0,
    INT8: -128,
    INT16: -32768,
    INT32: -2147483648,
    INT64: Number.MIN_VALUE, // Note: problem because max value in js has 53 precision and not 64,
    FLOAT32: Number.MIN_VALUE, // TODO
    FLOAT64: Number.MIN_VALUE // TODO
};

/**
 * The number of bytes of a certain native.
 */
export const N_OF_BYTES: TypesDescription = {
    BOOL: 1,
    UINT8: 1,
    UINT16: 2,
    UINT32: 4,
    UINT64: 8,
    INT8: 1,
    INT16: 2,
    INT32: 4,
    INT64: 8,
    FLOAT32: 4,
    FLOAT64: 8
};

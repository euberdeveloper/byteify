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

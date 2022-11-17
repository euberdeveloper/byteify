/**
 * Enum containing all the possible types that can be serialized or deserialized
 */
export enum NativeType {
    BOOL = 'bool',
    UINT8 = 'uint8',
    UINT16 = 'uint16',
    UINT32 = 'uint32',
    UINT64 = 'uint64',
    INT8 = 'int8',
    INT16 = 'int16',
    INT32 = 'int32',
    INT64 = 'int64',
    FLOAT32 = 'float32',
    FLOAT64 = 'float64'
}

/**
 * Enum containing all the possible endianesses that can be used
 */
export enum ByteifyEndianess {
    BIG_ENDIAN = 'BIG_ENDIAN',
    LITTLE_ENDIAN = 'LITTLE_ENDIAN'
}

/**
 * Enum containing the options passed to the deserialization or serialization functions
 */
export interface ByteifyOptions {
    /**
     * If little endian or big endian will be used. By default it is little endian.
     */
    endianess: ByteifyEndianess;
}

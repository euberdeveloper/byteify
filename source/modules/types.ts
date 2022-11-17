export enum ByteifyEndianess {
    BIG_ENDIAN = 'BIG_ENDIAN',
    LITTLE_ENDIAN = 'LITTLE_ENDIAN'
}

export interface ByteifyOptions {
    endianess: ByteifyEndianess;
}

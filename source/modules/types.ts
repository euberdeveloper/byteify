export enum ByteifyCase {
    BIG_ENDIAN = 'BIG_ENDIAN',
    LITTLE_ENDIAN = 'LITTLE_ENDIAN'
}

export interface ByteifyOptions {
    type: ByteifyCase;
}

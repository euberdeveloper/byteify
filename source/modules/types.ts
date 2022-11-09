export enum ByteifyCase {
    BIG_ENDIAN,
    LITTLE_ENDIAN
}

export interface ByteifyOptions {
    type: ByteifyCase;
}

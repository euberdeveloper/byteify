import { NativeType, ByteifyEndianess } from '../types';
import { ByteifyError } from './ByteifyError';

/**
 * The [[ByteifyError]] that happens because of an error with the deserialization
 */
export class ByteifyDeserializationError extends ByteifyError {
    /**
     * The default message of the error
     */
    protected static readonly DEFAULT_MESSAGE: string = 'Error in byteify deserialization';

    /**
     * The native type of the value that was to be deserialized
     */
    public nativeType: NativeType | null;
    /**
     * The byteify endianess that was to be used
     */
    public endianess: ByteifyEndianess | null;
    /**
     * The value that was to be deserialized
     */
    public valueToDeserialize: number[] | null;
    /**
     * The deserialized value
     */
    public deserializedResult: number | bigint | null;

    /**
     * The constructor of the [[ByteifyDeserializationError]] class.
     * @param message The message of the error
     * @param nativeType The native type of the value that was to be deserialized
     * @param endianess The byteify endianess that was to be used
     * @param valueToDeserialize The value that was to be deserialized
     * @param deserializedResult The deserialized value
     */
    constructor(
        message = ByteifyDeserializationError.DEFAULT_MESSAGE,
        nativeType?: NativeType,
        endianess?: ByteifyEndianess,
        valueToDeserialize?: number[],
        deserializedResult?: number | bigint
    ) {
        super(message);
        this.name = 'ByteifyDeserializationError';
        this.nativeType = nativeType ?? null;
        this.endianess = endianess ?? null;
        this.valueToDeserialize = valueToDeserialize ?? null;
        this.deserializedResult = deserializedResult ?? null;
    }
}

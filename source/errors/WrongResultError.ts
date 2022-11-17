import { NativeType, ByteifyEndianess } from '../types';
import { ByteifyDeserializationError } from './DeserializationError';

/**
 * The [[ByteifyDeserializationError]] that happens because the input is of wrong deserialized result
 */
export class ByteifyDeserializationWrongResultError extends ByteifyDeserializationError {
    /**
     * The default message of the error
     */
    protected static readonly DEFAULT_MESSAGE: string =
        'Error in byteify deserialization due to wrong deserialized result';

    /**
     * The constructor of the [[ByteifyDeserializationWrongResultError]] class.
     * @param message The message of the error
     * @param nativeType The native type of the value that was to be deserialized
     * @param endianess The byteify endianess that was to be used
     * @param valueToDeserialize The value that was to be deserialized
     * @param deserializedResult The deserialized value
     */
    constructor(
        message = ByteifyDeserializationWrongResultError.DEFAULT_MESSAGE,
        nativeType?: NativeType,
        endianess?: ByteifyEndianess,
        valueToDeserialize?: number[],
        deserializedResult?: number | bigint
    ) {
        super(message, nativeType, endianess, valueToDeserialize, deserializedResult);
        this.name = 'ByteifyDeserializationWrongResultError';
    }
}

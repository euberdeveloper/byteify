import { NativeType, ByteifyEndianess } from '@/types/index.js';
import { ByteifySerializationError } from './SerializationError.js';

/**
 * The [[ByteifySerializationError]] that happens because the input is too big
 */
export class ByteifySerializationInputTooBigError extends ByteifySerializationError {
    /**
     * The default message of the error
     */
    protected static readonly DEFAULT_MESSAGE: string = 'Error in byteify serialization due to too big input';

    /**
     * The constructor of the [[ByteifySerializationInputTooBigError]] class.
     * @param message The message of the error
     * @param nativeType The native type of the value that was to be serialized
     * @param endianess The byteify endianess that was to be used
     * @param valueToSerialize The value that was to be serialized
     * @param serializedResult The serialized value
     */
    constructor(
        message = ByteifySerializationInputTooBigError.DEFAULT_MESSAGE,
        nativeType?: NativeType,
        endianess?: ByteifyEndianess,
        valueToSerialize?: number | bigint,
        serializedResult?: number[]
    ) {
        super(message, nativeType, endianess, valueToSerialize, serializedResult);
        this.name = 'ByteifySerializationInputTooBigError';
        this.nativeType = nativeType ?? null;
        this.endianess = endianess ?? null;
        this.valueToSerialize = valueToSerialize ?? null;
        this.serializedResult = serializedResult ?? null;
    }
}

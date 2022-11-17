import { ByteifyEndianess } from '../modules/types';
import { NativeType } from '../types';
import { ByteifySerializationError } from './SerializationError';

/**
 * The [[ByteifySerializationError]] that happens because the input cannot be decimal
 */
export class ByteifySerializationCannotBeDecimalError extends ByteifySerializationError {
    /**
     * The default message of the error
     */
    protected static readonly DEFAULT_MESSAGE: string =
        'Error in byteify serialization because input cannot be decimal';

    /**
     * The constructor of the [[ByteifySerializationCannotBeDecimalError]] class.
     * @param message The message of the error
     * @param nativeType The native type of the value that was to be serialized
     * @param endianess The byteify endianess that was to be used
     * @param valueToSerialize The value that was to be serialized
     * @param serializedResult The serialized value
     */
    constructor(
        message = ByteifySerializationCannotBeDecimalError.DEFAULT_MESSAGE,
        nativeType?: NativeType,
        endianess?: ByteifyEndianess,
        valueToSerialize?: number | bigint,
        serializedResult?: number[]
    ) {
        super(message, nativeType, endianess, valueToSerialize, serializedResult);
        this.name = 'ByteifySerializationCannotBeDecimalError';
    }
}

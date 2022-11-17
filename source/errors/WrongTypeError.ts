import { ByteifyEndianess } from '../modules/types';
import { NativeType } from '../types';
import { ByteifySerializationError } from './SerializationError';

/**
 * The [[ByteifySerializationError]] that happens because the input is of the wrong type
 */
export class ByteifySerializationWrongTypeError extends ByteifySerializationError {
    /**
     * The default message of the error
     */
    protected static readonly DEFAULT_MESSAGE: string = 'Error in byteify serialization due to input type';

    /**
     * The given type of the value that was to be serialized
     */
    public givenType: string | null;
    /**
     * The expected type of the value that was to be serialized
     */
    public expectedType: string | null;

    /**
     * The constructor of the [[ByteifySerializationWrongTypeError]] class.
     * @param message The message of the error
     * @param nativeType The native type of the value that was to be serialized
     * @param endianess The byteify endianess that was to be used
     * @param valueToSerialize The value that was to be serialized
     * @param serializedResult The serialized value
     * @param givenType The given type of the value that was to be serialized
     * @param expectedType The expected type of the value that was to be serialized
     */
    constructor(
        message = ByteifySerializationWrongTypeError.DEFAULT_MESSAGE,
        nativeType?: NativeType,
        endianess?: ByteifyEndianess,
        valueToSerialize?: number | bigint,
        serializedResult?: number[],
        givenType?: string,
        expectedType?: string
    ) {
        super(message, nativeType, endianess, valueToSerialize, serializedResult);
        this.name = 'ByteifySerializationWrongTypeError';
        this.givenType = givenType ?? null;
        this.expectedType = expectedType ?? null;
    }
}

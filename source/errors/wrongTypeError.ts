import { ByteifyEndianess } from '../modules/types';
import { NativeType } from '../types';
import { ByteifySerializationError } from './serializationError';

/**
 * The [[ByteifySerializationError]] that happens because of an error with the serialization
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
     */
    constructor(
        message = ByteifySerializationWrongTypeError.DEFAULT_MESSAGE,
        nativeType?: NativeType,
        endianess?: ByteifyEndianess,
        valueToSerialize?: number | bigint,
        serializedResult?: Uint8Array,
        givenType?: string,
        expectedType?: string
    ) {
        super(message);
        this.name = 'ByteifySerializationWrongTypeError';
        this.nativeType = nativeType ?? null;
        this.endianess = endianess ?? null;
        this.valueToSerialize = valueToSerialize ?? null;
        this.serializedResult = serializedResult ?? null;
        this.givenType = givenType ?? null;
        this.expectedType = expectedType ?? null;
    }
}

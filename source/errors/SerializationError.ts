import { NativeType, ByteifyEndianess } from '../types';
import { ByteifyError } from './ByteifyError';

/**
 * The [[ByteifyError]] that happens because of an error with the serialization
 */
export class ByteifySerializationError extends ByteifyError {
    /**
     * The default message of the error
     */
    protected static readonly DEFAULT_MESSAGE: string = 'Error in byteify serialization';

    /**
     * The native type of the value that was to be serialized
     */
    public nativeType: NativeType | null;
    /**
     * The byteify endianess that was to be used
     */
    public endianess: ByteifyEndianess | null;
    /**
     * The value that was to be serialized
     */
    public valueToSerialize: number | bigint | null;
    /**
     * The serialized value
     */
    public serializedResult: number[] | null;

    /**
     * The constructor of the [[ByteifySerializationError]] class.
     * @param message The message of the error
     * @param nativeType The native type of the value that was to be serialized
     * @param endianess The byteify endianess that was to be used
     * @param valueToSerialize The value that was to be serialized
     * @param serializedResult The serialized value
     */
    constructor(
        message = ByteifySerializationError.DEFAULT_MESSAGE,
        nativeType?: NativeType,
        endianess?: ByteifyEndianess,
        valueToSerialize?: number | bigint,
        serializedResult?: number[]
    ) {
        super(message);
        this.name = 'ByteifySerializationError';
        this.nativeType = nativeType ?? null;
        this.endianess = endianess ?? null;
        this.valueToSerialize = valueToSerialize ?? null;
        this.serializedResult = serializedResult ?? null;
    }
}

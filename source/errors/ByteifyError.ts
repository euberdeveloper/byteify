/**
 * The class of the errors of the module byteify.
 */
export class ByteifyError extends Error {
    /**
     * The default message of the error
     */
    protected static readonly DEFAULT_MESSAGE: string = 'Error in byteify';

    /**
     * The constructor of the [[ByteifyError]] class.
     * @param message The message of the error
     */
    constructor(message = ByteifyError.DEFAULT_MESSAGE) {
        super(message);
        this.name = 'ByteifyError';
    }
}

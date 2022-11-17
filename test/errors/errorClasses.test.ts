import {
    ByteifyError,
    ByteifySerializationError,
    ByteifyDeserializationError,
    ByteifyDeserializationInvalidLengthError,
    ByteifyDeserializationWrongResultError,
    ByteifySerializationCannotBeDecimalError,
    ByteifySerializationInputTooBigError,
    ByteifySerializationInputTooSmallError,
    ByteifySerializationWrongTypeError,
    NativeType,
    ByteifyEndianess
} from '../../source';

describe('Test error classes', function () {
    describe('Test hierarchy', function () {
        it('ByteifyError', function () {
            const error = new ByteifyError();
            expect(error).toBeInstanceOf(Error);
        });

        it('ByteifySerializationError', function () {
            const error = new ByteifySerializationError();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ByteifyError);
        });

        it('ByteifySerializationCannotBeDecimalError', function () {
            const error = new ByteifySerializationCannotBeDecimalError();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ByteifyError);
            expect(error).toBeInstanceOf(ByteifySerializationError);
        });

        it('ByteifySerializationInputTooBigError', function () {
            const error = new ByteifySerializationInputTooBigError();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ByteifyError);
            expect(error).toBeInstanceOf(ByteifySerializationError);
        });

        it('ByteifySerializationInputTooSmallError', function () {
            const error = new ByteifySerializationInputTooSmallError();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ByteifyError);
            expect(error).toBeInstanceOf(ByteifySerializationError);
        });

        it('ByteifySerializationWrongTypeError', function () {
            const error = new ByteifySerializationWrongTypeError();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ByteifyError);
            expect(error).toBeInstanceOf(ByteifySerializationError);
        });

        it('ByteifyDeserializationError', function () {
            const error = new ByteifySerializationError();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ByteifyError);
        });

        it('ByteifyDeserializationInvalidLengthError', function () {
            const error = new ByteifyDeserializationInvalidLengthError();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ByteifyError);
            expect(error).toBeInstanceOf(ByteifyDeserializationError);
        });

        it('ByteifyDeserializationWrongResultError', function () {
            const error = new ByteifyDeserializationWrongResultError();
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ByteifyError);
            expect(error).toBeInstanceOf(ByteifyDeserializationError);
        });
    });

    describe('Test instantiation', function () {
        it('ByteifyError', function () {
            const errorWithDefualts = new ByteifyError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifyError);

            const errorWithMessage = new ByteifyError('Error message');
            expect(errorWithMessage).toBeInstanceOf(ByteifyError);
            expect(errorWithMessage.message).toBe('Error message');
        });

        it('ByteifySerializationError', function () {
            const errorWithDefualts = new ByteifySerializationError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifySerializationError);
            expect(errorWithDefualts.nativeType).toBe(null);
            expect(errorWithDefualts.endianess).toBe(null);
            expect(errorWithDefualts.valueToSerialize).toBe(null);
            expect(errorWithDefualts.serializedResult).toEqual(null);

            const errorWithMessage = new ByteifySerializationError(
                'Error message',
                NativeType.BOOL,
                ByteifyEndianess.BIG_ENDIAN,
                1,
                []
            );
            expect(errorWithMessage).toBeInstanceOf(ByteifySerializationError);
            expect(errorWithMessage.message).toBe('Error message');
            expect(errorWithMessage.nativeType).toBe(NativeType.BOOL);
            expect(errorWithMessage.endianess).toBe(ByteifyEndianess.BIG_ENDIAN);
            expect(errorWithMessage.valueToSerialize).toBe(1);
            expect(errorWithMessage.serializedResult).toEqual([]);
        });

        it('ByteifySerializationCannotBeDecimalError', function () {
            const errorWithDefualts = new ByteifySerializationCannotBeDecimalError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifySerializationCannotBeDecimalError);
            expect(errorWithDefualts.nativeType).toBe(null);
            expect(errorWithDefualts.endianess).toBe(null);
            expect(errorWithDefualts.valueToSerialize).toBe(null);
            expect(errorWithDefualts.serializedResult).toEqual(null);

            const errorWithMessage = new ByteifySerializationCannotBeDecimalError(
                'Error message',
                NativeType.BOOL,
                ByteifyEndianess.BIG_ENDIAN,
                1,
                []
            );
            expect(errorWithMessage).toBeInstanceOf(ByteifySerializationCannotBeDecimalError);
            expect(errorWithMessage.message).toBe('Error message');
            expect(errorWithMessage.nativeType).toBe(NativeType.BOOL);
            expect(errorWithMessage.endianess).toBe(ByteifyEndianess.BIG_ENDIAN);
            expect(errorWithMessage.valueToSerialize).toBe(1);
            expect(errorWithMessage.serializedResult).toEqual([]);
        });

        it('ByteifySerializationInputTooBigError', function () {
            const errorWithDefualts = new ByteifySerializationInputTooBigError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifySerializationInputTooBigError);
            expect(errorWithDefualts.nativeType).toBe(null);
            expect(errorWithDefualts.endianess).toBe(null);
            expect(errorWithDefualts.valueToSerialize).toBe(null);
            expect(errorWithDefualts.serializedResult).toEqual(null);

            const errorWithMessage = new ByteifySerializationInputTooBigError(
                'Error message',
                NativeType.BOOL,
                ByteifyEndianess.BIG_ENDIAN,
                1,
                []
            );
            expect(errorWithMessage).toBeInstanceOf(ByteifySerializationInputTooBigError);
            expect(errorWithMessage.message).toBe('Error message');
            expect(errorWithMessage.nativeType).toBe(NativeType.BOOL);
            expect(errorWithMessage.endianess).toBe(ByteifyEndianess.BIG_ENDIAN);
            expect(errorWithMessage.valueToSerialize).toBe(1);
            expect(errorWithMessage.serializedResult).toEqual([]);
        });

        it('ByteifySerializationInputTooSmallError', function () {
            const errorWithDefualts = new ByteifySerializationInputTooSmallError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifySerializationInputTooSmallError);
            expect(errorWithDefualts.nativeType).toBe(null);
            expect(errorWithDefualts.endianess).toBe(null);
            expect(errorWithDefualts.valueToSerialize).toBe(null);
            expect(errorWithDefualts.serializedResult).toEqual(null);

            const errorWithMessage = new ByteifySerializationInputTooSmallError(
                'Error message',
                NativeType.BOOL,
                ByteifyEndianess.BIG_ENDIAN,
                1,
                []
            );
            expect(errorWithMessage).toBeInstanceOf(ByteifySerializationInputTooSmallError);
            expect(errorWithMessage.message).toBe('Error message');
            expect(errorWithMessage.nativeType).toBe(NativeType.BOOL);
            expect(errorWithMessage.endianess).toBe(ByteifyEndianess.BIG_ENDIAN);
            expect(errorWithMessage.valueToSerialize).toBe(1);
            expect(errorWithMessage.serializedResult).toEqual([]);
        });

        it('ByteifySerializationWrongTypeError', function () {
            const errorWithDefualts = new ByteifySerializationWrongTypeError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifySerializationWrongTypeError);
            expect(errorWithDefualts.nativeType).toBe(null);
            expect(errorWithDefualts.endianess).toBe(null);
            expect(errorWithDefualts.valueToSerialize).toBe(null);
            expect(errorWithDefualts.serializedResult).toEqual(null);

            const errorWithMessage = new ByteifySerializationWrongTypeError(
                'Error message',
                NativeType.BOOL,
                ByteifyEndianess.BIG_ENDIAN,
                1,
                []
            );
            expect(errorWithMessage).toBeInstanceOf(ByteifySerializationWrongTypeError);
            expect(errorWithMessage.message).toBe('Error message');
            expect(errorWithMessage.nativeType).toBe(NativeType.BOOL);
            expect(errorWithMessage.endianess).toBe(ByteifyEndianess.BIG_ENDIAN);
            expect(errorWithMessage.valueToSerialize).toBe(1);
            expect(errorWithMessage.serializedResult).toEqual([]);
        });

        it('ByteifyDeserializationError', function () {
            const errorWithDefualts = new ByteifyDeserializationError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifyDeserializationError);
            expect(errorWithDefualts.nativeType).toBe(null);
            expect(errorWithDefualts.endianess).toBe(null);
            expect(errorWithDefualts.valueToDeserialize).toBe(null);
            expect(errorWithDefualts.deserializedResult).toBe(null);

            const errorWithMessage = new ByteifyDeserializationError(
                'Error message',
                NativeType.BOOL,
                ByteifyEndianess.BIG_ENDIAN,
                [],
                1
            );
            expect(errorWithMessage).toBeInstanceOf(ByteifyDeserializationError);
            expect(errorWithMessage.message).toBe('Error message');
            expect(errorWithMessage.nativeType).toBe(NativeType.BOOL);
            expect(errorWithMessage.endianess).toBe(ByteifyEndianess.BIG_ENDIAN);
            expect(errorWithMessage.valueToDeserialize).toEqual([]);
            expect(errorWithMessage.deserializedResult).toBe(1);
        });

        it('ByteifyDeserializationInvalidLengthError', function () {
            const errorWithDefualts = new ByteifyDeserializationInvalidLengthError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifyDeserializationInvalidLengthError);
            expect(errorWithDefualts.nativeType).toBe(null);
            expect(errorWithDefualts.endianess).toBe(null);
            expect(errorWithDefualts.valueToDeserialize).toBe(null);
            expect(errorWithDefualts.deserializedResult).toBe(null);

            const errorWithMessage = new ByteifyDeserializationInvalidLengthError(
                'Error message',
                NativeType.BOOL,
                ByteifyEndianess.BIG_ENDIAN,
                [],
                1
            );
            expect(errorWithMessage).toBeInstanceOf(ByteifyDeserializationInvalidLengthError);
            expect(errorWithMessage.message).toBe('Error message');
            expect(errorWithMessage.nativeType).toBe(NativeType.BOOL);
            expect(errorWithMessage.endianess).toBe(ByteifyEndianess.BIG_ENDIAN);
            expect(errorWithMessage.valueToDeserialize).toEqual([]);
            expect(errorWithMessage.deserializedResult).toBe(1);
        });

        it('ByteifyDeserializationWrongResultError', function () {
            const errorWithDefualts = new ByteifyDeserializationWrongResultError();
            expect(errorWithDefualts).toBeInstanceOf(ByteifyDeserializationWrongResultError);
            expect(errorWithDefualts.nativeType).toBe(null);
            expect(errorWithDefualts.endianess).toBe(null);
            expect(errorWithDefualts.valueToDeserialize).toBe(null);
            expect(errorWithDefualts.deserializedResult).toBe(null);

            const errorWithMessage = new ByteifyDeserializationWrongResultError(
                'Error message',
                NativeType.BOOL,
                ByteifyEndianess.BIG_ENDIAN,
                [],
                1
            );
            expect(errorWithMessage).toBeInstanceOf(ByteifyDeserializationWrongResultError);
            expect(errorWithMessage.message).toBe('Error message');
            expect(errorWithMessage.nativeType).toBe(NativeType.BOOL);
            expect(errorWithMessage.endianess).toBe(ByteifyEndianess.BIG_ENDIAN);
            expect(errorWithMessage.valueToDeserialize).toEqual([]);
            expect(errorWithMessage.deserializedResult).toBe(1);
        });
    });
});

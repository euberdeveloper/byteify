import * as byteify from '../../source';
import { assert } from 'chai';

export default function (): void {
    describe('Test errored cases', function () {
        /* UINT */

        describe('Uint8', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeUint8(true as any));
                assert.throws(() => byteify.serializeUint8('string' as any));
                assert.throws(() => byteify.serializeUint8({} as any));
                assert.throws(() => byteify.serializeUint8([] as any));
            });

            it('should throw an error due to value too small', function () {
                assert.throws(() => byteify.serializeUint8(byteify.limits.MIN.uint8 - 1));
            });

            it('should throw an error due to value too big', function () {
                assert.throws(() => byteify.serializeUint8(byteify.limits.MAX.uint8 + 1));
            });
        });

        describe('Uint16', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeUint16(true as any));
                assert.throws(() => byteify.serializeUint16('string' as any));
                assert.throws(() => byteify.serializeUint16({} as any));
                assert.throws(() => byteify.serializeUint16([] as any));
            });

            it('should throw an error due to value too small', function () {
                assert.throws(() => byteify.serializeUint16(byteify.limits.MIN.uint16 - 1));
            });

            it('should throw an error due to value too big', function () {
                assert.throws(() => byteify.serializeUint16(byteify.limits.MAX.uint16 + 1));
            });
        });

        describe('Uint32', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeUint32(true as any));
                assert.throws(() => byteify.serializeUint32('string' as any));
                assert.throws(() => byteify.serializeUint32({} as any));
                assert.throws(() => byteify.serializeUint32([] as any));
            });

            it('should throw an error due to value too small', function () {
                assert.throws(() => byteify.serializeUint32(byteify.limits.MIN.uint32 - 1));
            });

            it('should throw an error due to value too big', function () {
                assert.throws(() => byteify.serializeUint32(byteify.limits.MAX.uint32 + 1));
            });
        });

        describe('Uint64', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeUint64(true as any));
                assert.throws(() => byteify.serializeUint64('string' as any));
                assert.throws(() => byteify.serializeUint64({} as any));
                assert.throws(() => byteify.serializeUint64([] as any));
            });

            it('should throw an error due to value too small', function () {
                assert.throws(() => byteify.serializeUint64(byteify.limits.MIN.uint64 - 1));
            });
        });

        /* INT */

        describe('Int8', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeInt8(true as any));
                assert.throws(() => byteify.serializeInt8('string' as any));
                assert.throws(() => byteify.serializeInt8({} as any));
                assert.throws(() => byteify.serializeInt8([] as any));
            });

            it('should throw an error due to value too small', function () {
                assert.throws(() => byteify.serializeInt8(byteify.limits.MIN.int8 - 1));
            });

            it('should throw an error due to value too big', function () {
                assert.throws(() => byteify.serializeInt8(byteify.limits.MAX.int8 + 1));
            });
        });

        describe('Int16', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeInt16(true as any));
                assert.throws(() => byteify.serializeInt16('string' as any));
                assert.throws(() => byteify.serializeInt16({} as any));
                assert.throws(() => byteify.serializeInt16([] as any));
            });

            it('should throw an error due to value too small', function () {
                assert.throws(() => byteify.serializeInt16(byteify.limits.MIN.int16 - 1));
            });

            it('should throw an error due to value too big', function () {
                assert.throws(() => byteify.serializeInt16(byteify.limits.MAX.int16 + 1));
            });
        });

        describe('Int32', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeInt32(true as any));
                assert.throws(() => byteify.serializeInt32('string' as any));
                assert.throws(() => byteify.serializeInt32({} as any));
                assert.throws(() => byteify.serializeInt32([] as any));
            });

            it('should throw an error due to value too small', function () {
                assert.throws(() => byteify.serializeInt32(byteify.limits.MIN.int32 - 1));
            });

            it('should throw an error due to value too big', function () {
                assert.throws(() => byteify.serializeInt32(byteify.limits.MAX.int32 + 1));
            });
        });

        describe('Int64', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeInt64(true as any));
                assert.throws(() => byteify.serializeInt64('string' as any));
                assert.throws(() => byteify.serializeInt64({} as any));
                assert.throws(() => byteify.serializeInt64([] as any));
            });
        });

        /* FLOAT */

        describe('Float32', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeFloat32(true as any));
                assert.throws(() => byteify.serializeFloat32('string' as any));
                assert.throws(() => byteify.serializeFloat32({} as any));
                assert.throws(() => byteify.serializeFloat32([] as any));
            });

            it('should throw an error due to value too small', function () {
                this.skip();
            });

            it('should throw an error due to value too big', function () {
                this.skip();
            });
        });

        describe('Float64', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeFloat64(true as any));
                assert.throws(() => byteify.serializeFloat64('string' as any));
                assert.throws(() => byteify.serializeFloat64({} as any));
                assert.throws(() => byteify.serializeFloat64([] as any));
            });

            it('should throw an error due to value too small', function () {
                this.skip();
            });

            it('should throw an error due to value too big', function () {
                this.skip();
            });
        });
    });
}

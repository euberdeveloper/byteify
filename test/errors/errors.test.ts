import * as byteify from '../../source';

describe('Test errored cases', function () {
    /* UINT */

    describe('Uint8', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeUint8('test' as any)).toThrowError();
                expect(() => byteify.serializeUint8('string' as any)).toThrowError();
                expect(() => byteify.serializeUint8({} as any)).toThrowError();
                expect(() => byteify.serializeUint8([] as any)).toThrowError();
            });

            it('should throw an error due to decimal value', function () {
                expect(() => byteify.serializeUint8(23.23)).toThrowError();
                expect(() => byteify.serializeUint8(-23.23)).toThrowError();
                expect(() => byteify.serializeUint8(0.0023)).toThrowError();
            });

            it('should throw an error due to value too small', function () {
                expect(() => byteify.serializeUint8(byteify.limits.MIN.uint8 - 1)).toThrowError();
            });

            it('should throw an error due to value too big', function () {
                expect(() => byteify.serializeUint8(byteify.limits.MAX.uint8 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeUint8(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() => byteify.deserializeUint8(Uint8Array.from([23, 23]))).toThrowError();
            });
        });
    });

    describe('Uint16', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeUint16(true as any)).toThrowError();
                expect(() => byteify.serializeUint16('string' as any)).toThrowError();
                expect(() => byteify.serializeUint16({} as any)).toThrowError();
                expect(() => byteify.serializeUint16([] as any)).toThrowError();
            });

            it('should throw an error due to decimal value', function () {
                expect(() => byteify.serializeUint16(23.23)).toThrowError();
                expect(() => byteify.serializeUint16(-23.23)).toThrowError();
                expect(() => byteify.serializeUint16(0.0023)).toThrowError();
            });

            it('should throw an error due to value too small', function () {
                expect(() => byteify.serializeUint16(byteify.limits.MIN.uint16 - 1)).toThrowError();
            });

            it('should throw an error due to value too big', function () {
                expect(() => byteify.serializeUint16(byteify.limits.MAX.uint16 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeUint16(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() => byteify.deserializeUint16(Uint8Array.from([23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Uint32', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeUint32(true as any)).toThrowError();
                expect(() => byteify.serializeUint32('string' as any)).toThrowError();
                expect(() => byteify.serializeUint32({} as any)).toThrowError();
                expect(() => byteify.serializeUint32([] as any)).toThrowError();
            });

            it('should throw an error due to decimal value', function () {
                expect(() => byteify.serializeUint32(23.23)).toThrowError();
                expect(() => byteify.serializeUint32(-23.23)).toThrowError();
                expect(() => byteify.serializeUint32(0.0023)).toThrowError();
            });

            it('should throw an error due to value too small', function () {
                expect(() => byteify.serializeUint32(byteify.limits.MIN.uint32 - 1)).toThrowError();
            });

            it('should throw an error due to value too big', function () {
                expect(() => byteify.serializeUint32(byteify.limits.MAX.uint32 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeUint32(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() => byteify.deserializeUint32(Uint8Array.from([23, 23, 23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Uint64', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeUint64(true as any)).toThrowError();
                expect(() => byteify.serializeUint64('string' as any)).toThrowError();
                expect(() => byteify.serializeUint64({} as any)).toThrowError();
                expect(() => byteify.serializeUint64([] as any)).toThrowError();
            });

            it('should throw an error due to decimal value', function () {
                expect(() => byteify.serializeUint64(23.23)).toThrowError();
                expect(() => byteify.serializeUint64(-23.23)).toThrowError();
                expect(() => byteify.serializeUint64(0.0023)).toThrowError();
            });

            it('should throw an error due to value too small', function () {
                expect(() => byteify.serializeUint64(byteify.limits.MIN.uint64 - 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeUint64(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(byteify.deserializeUint64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))).toThrowError();
            });
        });
    });

    /* INT */

    describe('Int8', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeInt8(true as any)).toThrowError();
                expect(() => byteify.serializeInt8('string' as any)).toThrowError();
                expect(() => byteify.serializeInt8({} as any)).toThrowError();
                expect(() => byteify.serializeInt8([] as any)).toThrowError();
            });

            it('should throw an error due to decimal value', function () {
                expect(() => byteify.serializeInt8(23.23)).toThrowError();
                expect(() => byteify.serializeInt8(-23.23)).toThrowError();
                expect(() => byteify.serializeInt8(0.0023)).toThrowError();
            });

            it('should throw an error due to value too small', function () {
                expect(() => byteify.serializeInt8(byteify.limits.MIN.int8 - 1)).toThrowError();
            });

            it('should throw an error due to value too big', function () {
                expect(() => byteify.serializeInt8(byteify.limits.MAX.int8 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeInt8(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() => byteify.deserializeInt8(Uint8Array.from([23, 23]))).toThrowError();
            });
        });
    });

    describe('Int16', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeInt16(true as any)).toThrowError();
                expect(() => byteify.serializeInt16('string' as any)).toThrowError();
                expect(() => byteify.serializeInt16({} as any)).toThrowError();
                expect(() => byteify.serializeInt16([] as any)).toThrowError();
            });

            it('should throw an error due to decimal value', function () {
                expect(() => byteify.serializeInt16(23.23)).toThrowError();
                expect(() => byteify.serializeInt16(-23.23)).toThrowError();
                expect(() => byteify.serializeInt16(0.0023)).toThrowError();
            });

            it('should throw an error due to value too small', function () {
                expect(() => byteify.serializeInt16(byteify.limits.MIN.int16 - 1)).toThrowError();
            });

            it('should throw an error due to value too big', function () {
                expect(() => byteify.serializeInt16(byteify.limits.MAX.int16 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeInt16(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() => byteify.deserializeInt16(Uint8Array.from([23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Int32', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeInt32(true as any)).toThrowError();
                expect(() => byteify.serializeInt32('string' as any)).toThrowError();
                expect(() => byteify.serializeInt32({} as any)).toThrowError();
                expect(() => byteify.serializeInt32([] as any)).toThrowError();
            });

            it('should throw an error due to decimal value', function () {
                expect(() => byteify.serializeInt32(23.23)).toThrowError();
                expect(() => byteify.serializeInt32(-23.23)).toThrowError();
                expect(() => byteify.serializeInt32(0.0023)).toThrowError();
            });

            it('should throw an error due to value too small', function () {
                expect(() => byteify.serializeInt32(byteify.limits.MIN.int32 - 1)).toThrowError();
            });

            it('should throw an error due to value too big', function () {
                expect(() => byteify.serializeInt32(byteify.limits.MAX.int32 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeInt32(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() => byteify.deserializeInt32(Uint8Array.from([23, 23, 23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Int64', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeInt64(true as any)).toThrowError();
                expect(() => byteify.serializeInt64('string' as any)).toThrowError();
                expect(() => byteify.serializeInt64({} as any)).toThrowError();
                expect(() => byteify.serializeInt64([] as any)).toThrowError();
            });

            it('should throw an error due to decimal value', function () {
                expect(() => byteify.serializeInt64(23.23)).toThrowError();
                expect(() => byteify.serializeInt64(-23.23)).toThrowError();
                expect(() => byteify.serializeInt64(0.0023)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeInt64(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() =>
                    byteify.deserializeInt64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))
                ).toThrowError();
            });
        });
    });

    /* FLOAT */

    describe('Float32', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeFloat32(true as any)).toThrowError();
                expect(() => byteify.serializeFloat32('string' as any)).toThrowError();
                expect(() => byteify.serializeFloat32({} as any)).toThrowError();
                expect(() => byteify.serializeFloat32([] as any)).toThrowError();
            });

            it('should throw an error due to value too small', function () {
                expect(() => byteify.serializeFloat32(byteify.limits.MIN.float32 - 0.1)).toThrowError();
            });

            it('should throw an error due to value too big', function () {
                expect(() => byteify.serializeFloat32(byteify.limits.MAX.float32 * 10)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeFloat32(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() => byteify.deserializeFloat32(Uint8Array.from([23, 23, 23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Float64', function () {
        describe('serialize', function () {
            it('should throw an error due to wrong type', function () {
                expect(() => byteify.serializeFloat64(true as any)).toThrowError();
                expect(() => byteify.serializeFloat64('string' as any)).toThrowError();
                expect(() => byteify.serializeFloat64({} as any)).toThrowError();
                expect(() => byteify.serializeFloat64([] as any)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('should throw an error due to too empty array', function () {
                expect(() => byteify.deserializeFloat64(Uint8Array.from([]))).toThrowError();
            });
            it('should throw an error due to too long array', function () {
                expect(() =>
                    byteify.deserializeFloat64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))
                ).toThrowError();
            });
        });
    });
});

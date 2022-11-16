import * as byteify from '../../source';

function testErrorDueToWrongType(serializingFunction: (value: any) => Uint8Array) {
    expect(() => serializingFunction('test' as any)).toThrowError();
    expect(() => serializingFunction('string' as any)).toThrowError();
    expect(() => serializingFunction({} as any)).toThrowError();
    expect(() => serializingFunction([] as any)).toThrowError();
}

function testErrorDueToDecimalValue(serializingFunction: (value: any) => Uint8Array) {
    expect(() => serializingFunction(23.23)).toThrowError();
    expect(() => serializingFunction(-23.23)).toThrowError();
    expect(() => serializingFunction(0.0023)).toThrowError();
}

describe('Test errored cases', function () {
    describe('Uint8', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeUint8);
            });

            it('Should throw an error due to decimal value', function () {
                testErrorDueToDecimalValue(byteify.serializeUint8);
            });

            it('Should throw an error due to value too small', function () {
                expect(() => byteify.serializeUint8(byteify.limits.MIN.uint8 - 1)).toThrowError();
            });

            it('Should throw an error due to value too big', function () {
                expect(() => byteify.serializeUint8(byteify.limits.MAX.uint8 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeUint8(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() => byteify.deserializeUint8(Uint8Array.from([23, 23]))).toThrowError();
            });
        });
    });

    describe('Uint16', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeUint16);
            });

            it('Should throw an error due to decimal value', function () {
                testErrorDueToDecimalValue(byteify.serializeUint16);
            });

            it('Should throw an error due to value too small', function () {
                expect(() => byteify.serializeUint16(byteify.limits.MIN.uint16 - 1)).toThrowError();
            });

            it('Should throw an error due to value too big', function () {
                expect(() => byteify.serializeUint16(byteify.limits.MAX.uint16 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeUint16(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() => byteify.deserializeUint16(Uint8Array.from([23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Uint32', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeUint32);
            });

            it('Should throw an error due to decimal value', function () {
                testErrorDueToDecimalValue(byteify.serializeUint32);
            });

            it('Should throw an error due to value too small', function () {
                expect(() => byteify.serializeUint32(byteify.limits.MIN.uint32 - 1)).toThrowError();
            });

            it('Should throw an error due to value too big', function () {
                expect(() => byteify.serializeUint32(byteify.limits.MAX.uint32 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeUint32(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() => byteify.deserializeUint32(Uint8Array.from([23, 23, 23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Uint64', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeUint64);
            });

            it('Should throw an error due to decimal value', function () {
                testErrorDueToDecimalValue(byteify.serializeUint64);
            });

            it('Should throw an error due to value too small', function () {
                expect(() => byteify.serializeUint64(byteify.limits.MIN.uint64 - 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeUint64(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() =>
                    byteify.deserializeUint64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))
                ).toThrowError();
            });
        });
    });

    /* INT */

    describe('Int8', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeInt8);
            });

            it('Should throw an error due to decimal value', function () {
                testErrorDueToDecimalValue(byteify.serializeInt8);
            });

            it('Should throw an error due to value too small', function () {
                expect(() => byteify.serializeInt8(byteify.limits.MIN.int8 - 1)).toThrowError();
            });

            it('Should throw an error due to value too big', function () {
                expect(() => byteify.serializeInt8(byteify.limits.MAX.int8 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeInt8(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() => byteify.deserializeInt8(Uint8Array.from([23, 23]))).toThrowError();
            });
        });
    });

    describe('Int16', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeInt16);
            });

            it('Should throw an error due to decimal value', function () {
                testErrorDueToDecimalValue(byteify.serializeInt16);
            });

            it('Should throw an error due to value too small', function () {
                expect(() => byteify.serializeInt16(byteify.limits.MIN.int16 - 1)).toThrowError();
            });

            it('Should throw an error due to value too big', function () {
                expect(() => byteify.serializeInt16(byteify.limits.MAX.int16 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeInt16(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() => byteify.deserializeInt16(Uint8Array.from([23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Int32', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeInt32);
            });

            it('Should throw an error due to decimal value', function () {
                testErrorDueToDecimalValue(byteify.serializeInt32);
            });

            it('Should throw an error due to value too small', function () {
                expect(() => byteify.serializeInt32(byteify.limits.MIN.int32 - 1)).toThrowError();
            });

            it('Should throw an error due to value too big', function () {
                expect(() => byteify.serializeInt32(byteify.limits.MAX.int32 + 1)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeInt32(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() => byteify.deserializeInt32(Uint8Array.from([23, 23, 23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Int64', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeInt64);
            });

            it('Should throw an error due to decimal value', function () {
                testErrorDueToDecimalValue(byteify.serializeInt64);
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeInt64(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() =>
                    byteify.deserializeInt64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))
                ).toThrowError();
            });
        });
    });

    describe('Float32', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeFloat32);
            });

            it('Should throw an error due to value too small', function () {
                expect(() => byteify.serializeFloat32(byteify.limits.MIN.float32 - 0.1)).toThrowError();
            });

            it('Should throw an error due to value too big', function () {
                expect(() => byteify.serializeFloat32(byteify.limits.MAX.float32 * 10)).toThrowError();
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeFloat32(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() => byteify.deserializeFloat32(Uint8Array.from([23, 23, 23, 23, 23]))).toThrowError();
            });
        });
    });

    describe('Float64', function () {
        describe('serialize', function () {
            it('Should throw an error due to wrong type', function () {
                testErrorDueToWrongType(byteify.serializeFloat64);
            });
        });
        describe('deserialize', function () {
            it('Should throw an error due to empty array', function () {
                expect(() => byteify.deserializeFloat64(Uint8Array.from([]))).toThrowError();
            });
            it('Should throw an error due to too long array', function () {
                expect(() =>
                    byteify.deserializeFloat64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))
                ).toThrowError();
            });
        });
    });
});

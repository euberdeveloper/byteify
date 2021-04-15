import * as byteify from '../../source';
import { assert } from 'chai';

export default function (): void {
    describe('Test errored cases', function () {
        /* UINT */

        describe('Uint8', function () {
            describe('serialize', function () {
                it('should throw an error due to wrong type', function () {
                    assert.throws(() => byteify.serializeUint8(true as any));
                    assert.throws(() => byteify.serializeUint8('string' as any));
                    assert.throws(() => byteify.serializeUint8({} as any));
                    assert.throws(() => byteify.serializeUint8([] as any));
                });

                it('should throw an error due to decimal value', function () {
                    assert.throws(() => byteify.serializeUint8(23.23));
                    assert.throws(() => byteify.serializeUint8(-23.23));
                    assert.throws(() => byteify.serializeUint8(0.0023));
                });

                it('should throw an error due to value too small', function () {
                    assert.throws(() => byteify.serializeUint8(byteify.limits.MIN.uint8 - 1));
                });

                it('should throw an error due to value too big', function () {
                    assert.throws(() => byteify.serializeUint8(byteify.limits.MAX.uint8 + 1));
                });
            });
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeUint8(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() => byteify.deserializeUint8(Uint8Array.from([23, 23])));
                });
            });
        });

        describe('Uint16', function () {
            describe('serialize', function () {
                it('should throw an error due to wrong type', function () {
                    assert.throws(() => byteify.serializeUint16(true as any));
                    assert.throws(() => byteify.serializeUint16('string' as any));
                    assert.throws(() => byteify.serializeUint16({} as any));
                    assert.throws(() => byteify.serializeUint16([] as any));
                });

                it('should throw an error due to decimal value', function () {
                    assert.throws(() => byteify.serializeUint16(23.23));
                    assert.throws(() => byteify.serializeUint16(-23.23));
                    assert.throws(() => byteify.serializeUint16(0.0023));
                });

                it('should throw an error due to value too small', function () {
                    assert.throws(() => byteify.serializeUint16(byteify.limits.MIN.uint16 - 1));
                });

                it('should throw an error due to value too big', function () {
                    assert.throws(() => byteify.serializeUint16(byteify.limits.MAX.uint16 + 1));
                });
            });
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeUint16(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() => byteify.deserializeUint16(Uint8Array.from([23, 23, 23])));
                });
            });
        });

        describe('Uint32', function () {
            describe('serialize', function () {
                it('should throw an error due to wrong type', function () {
                    assert.throws(() => byteify.serializeUint32(true as any));
                    assert.throws(() => byteify.serializeUint32('string' as any));
                    assert.throws(() => byteify.serializeUint32({} as any));
                    assert.throws(() => byteify.serializeUint32([] as any));
                });

                it('should throw an error due to decimal value', function () {
                    assert.throws(() => byteify.serializeUint32(23.23));
                    assert.throws(() => byteify.serializeUint32(-23.23));
                    assert.throws(() => byteify.serializeUint32(0.0023));
                });

                it('should throw an error due to value too small', function () {
                    assert.throws(() => byteify.serializeUint32(byteify.limits.MIN.uint32 - 1));
                });

                it('should throw an error due to value too big', function () {
                    assert.throws(() => byteify.serializeUint32(byteify.limits.MAX.uint32 + 1));
                });
            });
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeUint32(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() => byteify.deserializeUint32(Uint8Array.from([23, 23, 23, 23, 23])));
                });
            });
        });

        describe('Uint64', function () {
            describe('serialize', function () {
                it('should throw an error due to wrong type', function () {
                    assert.throws(() => byteify.serializeUint64(true as any));
                    assert.throws(() => byteify.serializeUint64('string' as any));
                    assert.throws(() => byteify.serializeUint64({} as any));
                    assert.throws(() => byteify.serializeUint64([] as any));
                });

                it('should throw an error due to decimal value', function () {
                    assert.throws(() => byteify.serializeUint64(23.23));
                    assert.throws(() => byteify.serializeUint64(-23.23));
                    assert.throws(() => byteify.serializeUint64(0.0023));
                });

                it('should throw an error due to value too small', function () {
                    assert.throws(() => byteify.serializeUint64(byteify.limits.MIN.uint64 - 1));
                });
            });
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeUint64(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() =>
                        byteify.deserializeUint64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))
                    );
                });
            });
        });

        /* INT */

        describe('Int8', function () {
            describe('serialize', function () {
                it('should throw an error due to wrong type', function () {
                    assert.throws(() => byteify.serializeInt8(true as any));
                    assert.throws(() => byteify.serializeInt8('string' as any));
                    assert.throws(() => byteify.serializeInt8({} as any));
                    assert.throws(() => byteify.serializeInt8([] as any));
                });

                it('should throw an error due to decimal value', function () {
                    assert.throws(() => byteify.serializeInt8(23.23));
                    assert.throws(() => byteify.serializeInt8(-23.23));
                    assert.throws(() => byteify.serializeInt8(0.0023));
                });

                it('should throw an error due to value too small', function () {
                    assert.throws(() => byteify.serializeInt8(byteify.limits.MIN.int8 - 1));
                });

                it('should throw an error due to value too big', function () {
                    assert.throws(() => byteify.serializeInt8(byteify.limits.MAX.int8 + 1));
                });
            });
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeInt8(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() => byteify.deserializeInt8(Uint8Array.from([23, 23])));
                });
            });
        });

        describe('Int16', function () {
            describe('serialize', function () {
                it('should throw an error due to wrong type', function () {
                    assert.throws(() => byteify.serializeInt16(true as any));
                    assert.throws(() => byteify.serializeInt16('string' as any));
                    assert.throws(() => byteify.serializeInt16({} as any));
                    assert.throws(() => byteify.serializeInt16([] as any));
                });

                it('should throw an error due to decimal value', function () {
                    assert.throws(() => byteify.serializeInt16(23.23));
                    assert.throws(() => byteify.serializeInt16(-23.23));
                    assert.throws(() => byteify.serializeInt16(0.0023));
                });

                it('should throw an error due to value too small', function () {
                    assert.throws(() => byteify.serializeInt16(byteify.limits.MIN.int16 - 1));
                });

                it('should throw an error due to value too big', function () {
                    assert.throws(() => byteify.serializeInt16(byteify.limits.MAX.int16 + 1));
                });
            });
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeInt16(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() => byteify.deserializeInt16(Uint8Array.from([23, 23, 23])));
                });
            });
        });

        describe('Int32', function () {
            describe('serialize', function () {
                it('should throw an error due to wrong type', function () {
                    assert.throws(() => byteify.serializeInt32(true as any));
                    assert.throws(() => byteify.serializeInt32('string' as any));
                    assert.throws(() => byteify.serializeInt32({} as any));
                    assert.throws(() => byteify.serializeInt32([] as any));
                });

                it('should throw an error due to decimal value', function () {
                    assert.throws(() => byteify.serializeInt32(23.23));
                    assert.throws(() => byteify.serializeInt32(-23.23));
                    assert.throws(() => byteify.serializeInt32(0.0023));
                });

                it('should throw an error due to value too small', function () {
                    assert.throws(() => byteify.serializeInt32(byteify.limits.MIN.int32 - 1));
                });

                it('should throw an error due to value too big', function () {
                    assert.throws(() => byteify.serializeInt32(byteify.limits.MAX.int32 + 1));
                });
            });
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeInt32(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() => byteify.deserializeInt32(Uint8Array.from([23, 23, 23, 23, 23])));
                });
            });
        });

        describe('Int64', function () {
            describe('serialize', function () {
                it('should throw an error due to wrong type', function () {
                    assert.throws(() => byteify.serializeInt64(true as any));
                    assert.throws(() => byteify.serializeInt64('string' as any));
                    assert.throws(() => byteify.serializeInt64({} as any));
                    assert.throws(() => byteify.serializeInt64([] as any));
                });

                it('should throw an error due to decimal value', function () {
                    assert.throws(() => byteify.serializeInt64(23.23));
                    assert.throws(() => byteify.serializeInt64(-23.23));
                    assert.throws(() => byteify.serializeInt64(0.0023));
                });
            });
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeInt64(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() =>
                        byteify.deserializeInt64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))
                    );
                });
            });
        });

        /* FLOAT */

        describe('Float32', function () {
            describe('serialize', function () {
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
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeFloat32(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() => byteify.deserializeFloat32(Uint8Array.from([23, 23, 23, 23, 23])));
                });
            });
        });

        describe('Float64', function () {
            describe('serialize', function () {
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
            describe('deserialize', function () {
                it('should throw an error due to too empty array', function () {
                    assert.throws(() => byteify.deserializeFloat64(Uint8Array.from([])));
                });
                it('should throw an error due to too long array', function () {
                    assert.throws(() =>
                        byteify.deserializeFloat64(Uint8Array.from([23, 23, 23, 23, 23, 23, 23, 23, 23]))
                    );
                });
            });
        });
    });
}

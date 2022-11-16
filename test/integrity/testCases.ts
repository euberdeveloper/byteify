import { NativeType } from '../../source/types';
import * as byteify from '../../source';
import { ByteifyOptions } from '../../source/modules/types';

export interface TestCase {
    nativeType: NativeType;
    serialize: (value: any) => Uint8Array;
    deserialize: (value: Uint8Array, options?: ByteifyOptions) => any;
}

const TEST_CASES: TestCase[] = [
    {
        nativeType: NativeType.UINT8,
        serialize: byteify.serializeUint8,
        deserialize: byteify.deserializeUint8
    },
    {
        nativeType: NativeType.UINT16,
        serialize: byteify.serializeUint16,
        deserialize: byteify.deserializeUint16
    },
    {
        nativeType: NativeType.UINT32,
        serialize: byteify.serializeUint32,
        deserialize: byteify.deserializeUint32
    },
    {
        nativeType: NativeType.UINT64,
        serialize: byteify.serializeUint64,
        deserialize: byteify.deserializeUint64
    },
    {
        nativeType: NativeType.INT8,
        serialize: byteify.serializeInt8,

        deserialize: byteify.deserializeInt8
    },
    {
        nativeType: NativeType.INT16,
        serialize: byteify.serializeInt16,
        deserialize: byteify.deserializeInt16
    },
    {
        nativeType: NativeType.INT32,
        serialize: byteify.serializeInt32,

        deserialize: byteify.deserializeInt32
    },
    {
        nativeType: NativeType.INT64,
        serialize: byteify.serializeInt64,
        deserialize: byteify.deserializeInt64
    },
    {
        nativeType: NativeType.FLOAT32,
        serialize: byteify.serializeFloat32,
        deserialize: byteify.deserializeFloat32
    },
    {
        nativeType: NativeType.FLOAT64,
        serialize: byteify.serializeFloat64,
        deserialize: byteify.deserializeFloat64
    }
];
export default TEST_CASES;

import * as byteify from '../../source';
import { NativeType } from '../../source/types';

export interface TestCase<T> {
    nativeType: NativeType;
    serializeFn: (x: T) => Uint8Array;
    deserializeFn: (x: Uint8Array) => T;
    tests: { value: T; serialized: number[] }[];
}

const testCases: TestCase<boolean | number | bigint>[] = [
    {
        nativeType: NativeType.BOOL,
        serializeFn: byteify.serializeBool,
        deserializeFn: byteify.deserializeBool,
        tests: [
            { value: true, serialized: [1] },
            { value: false, serialized: [0] }
        ]
    },
    {
        nativeType: NativeType.UINT8,
        serializeFn: byteify.serializeUint8,
        deserializeFn: byteify.deserializeUint8,

        tests: [
            { value: 0, serialized: [0] },
            { value: 1, serialized: [1] },
            { value: 12, serialized: [12] },
            { value: 42, serialized: [42] },
            { value: 127, serialized: [127] },
            { value: 128, serialized: [128] },
            { value: 192, serialized: [192] },
            { value: 255, serialized: [255] }
        ]
    },
    {
        nativeType: NativeType.UINT16,
        serializeFn: byteify.serializeUint16,
        deserializeFn: byteify.deserializeUint16,
        tests: [
            { value: 0, serialized: [0, 0] },
            { value: 1, serialized: [0, 1] },
            { value: 42, serialized: [0, 42] },
            { value: 127, serialized: [0, 127] },
            { value: 128, serialized: [0, 128] },
            { value: 192, serialized: [0, 192] },
            { value: 255, serialized: [0, 255] },
            { value: 256, serialized: [1, 0] },
            { value: 1000, serialized: [3, 232] },
            { value: 32896, serialized: [128, 128] },
            { value: 65535, serialized: [255, 255] }
        ]
    },
    {
        nativeType: NativeType.UINT32,
        serializeFn: byteify.serializeUint32,
        deserializeFn: byteify.deserializeUint32,
        tests: [
            { value: 0, serialized: [0, 0, 0, 0] },
            { value: 1, serialized: [0, 0, 0, 1] },
            { value: 42, serialized: [0, 0, 0, 42] },
            { value: 127, serialized: [0, 0, 0, 127] },
            { value: 128, serialized: [0, 0, 0, 128] },
            { value: 192, serialized: [0, 0, 0, 192] },
            { value: 255, serialized: [0, 0, 0, 255] },
            { value: 256, serialized: [0, 0, 1, 0] },
            { value: 1000, serialized: [0, 0, 3, 232] },
            { value: 32896, serialized: [0, 0, 128, 128] },
            { value: 49280, serialized: [0, 0, 192, 128] },
            { value: 65535, serialized: [0, 0, 255, 255] },
            { value: 65536, serialized: [0, 1, 0, 0] },
            { value: 1000000, serialized: [0, 15, 66, 64] },
            { value: 2147483647, serialized: [127, 255, 255, 255] },
            { value: 2147483648, serialized: [128, 0, 0, 0] },
            { value: 4294967295, serialized: [255, 255, 255, 255] }
        ]
    },
    {
        nativeType: NativeType.UINT64,
        serializeFn: byteify.serializeUint64,
        deserializeFn: byteify.deserializeUint64,
        tests: [
            { value: 0, serialized: [0, 0, 0, 0, 0, 0, 0, 0] },
            { value: 0n, serialized: [0, 0, 0, 0, 0, 0, 0, 0] },
            { value: 1, serialized: [0, 0, 0, 0, 0, 0, 0, 1] },
            { value: 42, serialized: [0, 0, 0, 0, 0, 0, 0, 42] },
            { value: 127, serialized: [0, 0, 0, 0, 0, 0, 0, 127] },
            { value: 128, serialized: [0, 0, 0, 0, 0, 0, 0, 128] },
            { value: 192, serialized: [0, 0, 0, 0, 0, 0, 0, 192] },
            { value: 255, serialized: [0, 0, 0, 0, 0, 0, 0, 255] },
            { value: 256, serialized: [0, 0, 0, 0, 0, 0, 1, 0] },
            { value: 1000, serialized: [0, 0, 0, 0, 0, 0, 3, 232] },
            { value: 32896n, serialized: [0, 0, 0, 0, 0, 0, 128, 128] },
            { value: 32896, serialized: [0, 0, 0, 0, 0, 0, 128, 128] },
            { value: 49280, serialized: [0, 0, 0, 0, 0, 0, 192, 128] },
            { value: 65535, serialized: [0, 0, 0, 0, 0, 0, 255, 255] },
            { value: 65536, serialized: [0, 0, 0, 0, 0, 1, 0, 0] },
            { value: 1000000, serialized: [0, 0, 0, 0, 0, 15, 66, 64] },
            { value: 2147483647, serialized: [0, 0, 0, 0, 127, 255, 255, 255] },
            { value: 2147483648, serialized: [0, 0, 0, 0, 128, 0, 0, 0] },
            { value: 4294967295, serialized: [0, 0, 0, 0, 255, 255, 255, 255] },
            { value: 4294967296, serialized: [0, 0, 0, 1, 0, 0, 0, 0] },
            { value: 10000000000, serialized: [0, 0, 0, 2, 84, 11, 228, 0] },
            { value: 281474976710655, serialized: [0, 0, 255, 255, 255, 255, 255, 255] },
            { value: 281474976710656, serialized: [0, 1, 0, 0, 0, 0, 0, 0] },
            { value: 10000000000000000n, serialized: [0, 35, 134, 242, 111, 193, 0, 0] },
            { value: 9007199254740991, serialized: [0, 31, 255, 255, 255, 255, 255, 255] },
            { value: 9007199254740992n, serialized: [0, 32, 0, 0, 0, 0, 0, 0] },
            { value: 18446744073709549568n, serialized: [255, 255, 255, 255, 255, 255, 248, 0] },
            { value: 18446744073709549569n, serialized: [255, 255, 255, 255, 255, 255, 248, 1] }
        ]
    }
];

export default testCases;

import * as byteify from '../../source';
import { NativeType } from '../../source/types';

export interface TestCase<T> {
    nativeType: NativeType;
    serializeFn: (x: T) => number[];
    deserializeFn: (x: number[]) => T;
    tests: { value: T; serialized: number[] }[];
}

const testCases: TestCase<boolean | number | bigint>[] = [
    // {
    //     nativeType: NativeType.BOOL,
    //     serializeFn: byteify.serializeBool,
    //     deserializeFn: byteify.deserializeBool,
    //     tests: [
    //         { value: true, serialized: [1] },
    //         { value: false, serialized: [0] }
    //     ]
    // },
    // {
    //     nativeType: NativeType.UINT8,
    //     serializeFn: byteify.serializeUint8,
    //     deserializeFn: byteify.deserializeUint8,

    //     tests: [
    //         { value: 0, serialized: [0] },
    //         { value: 1, serialized: [1] },
    //         { value: 12, serialized: [12] },
    //         { value: 42, serialized: [42] },
    //         { value: 127, serialized: [127] },
    //         { value: 128, serialized: [128] },
    //         { value: 192, serialized: [192] },
    //         { value: 255, serialized: [255] }
    //     ]
    // },
    // {
    //     nativeType: NativeType.UINT16,
    //     serializeFn: byteify.serializeUint16,
    //     deserializeFn: byteify.deserializeUint16,
    //     tests: [
    //         { value: 0, serialized: [0, 0] },
    //         { value: 1, serialized: [0, 1] },
    //         { value: 42, serialized: [0, 42] },
    //         { value: 127, serialized: [0, 127] },
    //         { value: 128, serialized: [0, 128] },
    //         { value: 192, serialized: [0, 192] },
    //         { value: 255, serialized: [0, 255] },
    //         { value: 256, serialized: [1, 0] },
    //         { value: 1000, serialized: [3, 232] },
    //         { value: 32_896, serialized: [128, 128] },
    //         { value: 65_535, serialized: [255, 255] }
    //     ]
    // },
    // {
    //     nativeType: NativeType.UINT32,
    //     serializeFn: byteify.serializeUint32,
    //     deserializeFn: byteify.deserializeUint32,
    //     tests: [
    //         { value: 0, serialized: [0, 0, 0, 0] },
    //         { value: 1, serialized: [0, 0, 0, 1] },
    //         { value: 42, serialized: [0, 0, 0, 42] },
    //         { value: 127, serialized: [0, 0, 0, 127] },
    //         { value: 128, serialized: [0, 0, 0, 128] },
    //         { value: 192, serialized: [0, 0, 0, 192] },
    //         { value: 255, serialized: [0, 0, 0, 255] },
    //         { value: 256, serialized: [0, 0, 1, 0] },
    //         { value: 1000, serialized: [0, 0, 3, 232] },
    //         { value: 32_896, serialized: [0, 0, 128, 128] },
    //         { value: 49_280, serialized: [0, 0, 192, 128] },
    //         { value: 65_535, serialized: [0, 0, 255, 255] },
    //         { value: 65_536, serialized: [0, 1, 0, 0] },
    //         { value: 1_000_000, serialized: [0, 15, 66, 64] },
    //         { value: 2_147_483_647, serialized: [127, 255, 255, 255] },
    //         { value: 2_147_483_648, serialized: [128, 0, 0, 0] },
    //         { value: 4_294_967_295, serialized: [255, 255, 255, 255] }
    //     ]
    // },
    // {
    //     nativeType: NativeType.UINT64,
    //     serializeFn: byteify.serializeUint64,
    //     deserializeFn: byteify.deserializeUint64,
    //     tests: [
    //         { value: 0n, serialized: [0, 0, 0, 0, 0, 0, 0, 0] },
    //         { value: 1n, serialized: [0, 0, 0, 0, 0, 0, 0, 1] },
    //         { value: 42n, serialized: [0, 0, 0, 0, 0, 0, 0, 42] },
    //         { value: 127n, serialized: [0, 0, 0, 0, 0, 0, 0, 127] },
    //         { value: 128n, serialized: [0, 0, 0, 0, 0, 0, 0, 128] },
    //         { value: 192n, serialized: [0, 0, 0, 0, 0, 0, 0, 192] },
    //         { value: 255n, serialized: [0, 0, 0, 0, 0, 0, 0, 255] },
    //         { value: 256n, serialized: [0, 0, 0, 0, 0, 0, 1, 0] },
    //         { value: 1000n, serialized: [0, 0, 0, 0, 0, 0, 3, 232] },
    //         { value: 32_896n, serialized: [0, 0, 0, 0, 0, 0, 128, 128] },
    //         { value: 49_280n, serialized: [0, 0, 0, 0, 0, 0, 192, 128] },
    //         { value: 65_535n, serialized: [0, 0, 0, 0, 0, 0, 255, 255] },
    //         { value: 65_536n, serialized: [0, 0, 0, 0, 0, 1, 0, 0] },
    //         { value: 1_000_000n, serialized: [0, 0, 0, 0, 0, 15, 66, 64] },
    //         { value: 2_147_483_647n, serialized: [0, 0, 0, 0, 127, 255, 255, 255] },
    //         { value: 2_147_483_648n, serialized: [0, 0, 0, 0, 128, 0, 0, 0] },
    //         { value: 4_294_967_295n, serialized: [0, 0, 0, 0, 255, 255, 255, 255] },
    //         { value: 4_294_967_296n, serialized: [0, 0, 0, 1, 0, 0, 0, 0] },
    //         { value: 10_000_000_000n, serialized: [0, 0, 0, 2, 84, 11, 228, 0] },
    //         { value: 281_474_976_710_655n, serialized: [0, 0, 255, 255, 255, 255, 255, 255] },
    //         { value: 281_474_976_710_656n, serialized: [0, 1, 0, 0, 0, 0, 0, 0] },
    //         { value: 10_000_000_000_000_000n, serialized: [0, 35, 134, 242, 111, 193, 0, 0] },
    //         { value: 9_007_199_254_740_991n, serialized: [0, 31, 255, 255, 255, 255, 255, 255] },
    //         { value: 9_007_199_254_740_992n, serialized: [0, 32, 0, 0, 0, 0, 0, 0] },
    //         { value: 18_446_744_073_709_549_568n, serialized: [255, 255, 255, 255, 255, 255, 248, 0] },
    //         { value: 18_446_744_073_709_549_569n, serialized: [255, 255, 255, 255, 255, 255, 248, 1] }
    //     ]
    // },
    {
        nativeType: NativeType.INT8,
        serializeFn: byteify.serializeInt8,
        deserializeFn: byteify.deserializeInt8,
        tests: [
            { value: 0, serialized: [0] },
            { value: 1, serialized: [1] },
            { value: 12, serialized: [12] },
            { value: 42, serialized: [42] },
            { value: 96, serialized: [96] },
            { value: 127, serialized: [127] },
            { value: -1, serialized: [-1] },
            { value: -12, serialized: [-12] },
            { value: -42, serialized: [-42] },
            { value: -96, serialized: [-96] },
            { value: -127, serialized: [-127] }
        ]
    },
    // {
    //     nativeType: NativeType.INT16,
    //     serializeFn: byteify.serializeInt16,
    //     deserializeFn: byteify.deserializeInt16,
    //     tests: [
    //         { value: 0, serialized: [0, 0] },
    //         { value: 1, serialized: [0, 1] },
    //         { value: 42, serialized: [0, 42] },
    //         { value: 127, serialized: [0, 127] },
    //         { value: 128, serialized: [0, 128] },
    //         { value: 192, serialized: [0, 192] },
    //         { value: 255, serialized: [0, 255] },
    //         { value: 256, serialized: [1, 0] },
    //         { value: 1000, serialized: [3, 232] },
    //         { value: 32_767, serialized: [127, 255] },
    //         { value: -1, serialized: [-1, -1] },
    //         { value: -12, serialized: [-1, -12] },
    //         { value: -42, serialized: [-1, -42] },
    //         { value: -96, serialized: [-1, -96] },
    //         { value: -127, serialized: [-1, -127] }
    //     ]
    // },
    // {
    //     nativeType: NativeType.INT32,
    //     serializeFn: byteify.serializeInt32,
    //     deserializeFn: byteify.deserializeInt32,
    //     tests: [
    //         { value: 0, serialized: [0, 0, 0, 0] },
    //         { value: 1, serialized: [0, 0, 0, 1] },
    //         { value: 42, serialized: [0, 0, 0, 42] },
    //         { value: 127, serialized: [0, 0, 0, 127] },
    //         { value: 128, serialized: [0, 0, 0, 128] },
    //         { value: 192, serialized: [0, 0, 0, 192] },
    //         { value: 255, serialized: [0, 0, 0, 255] },
    //         { value: 256, serialized: [0, 0, 1, 0] },
    //         { value: 1000, serialized: [0, 0, 3, 232] },
    //         { value: 32_896, serialized: [0, 0, 128, 128] },
    //         { value: 49_280, serialized: [0, 0, 192, 128] },
    //         { value: 65_535, serialized: [0, 0, 255, 255] },
    //         { value: 65_536, serialized: [0, 1, 0, 0] },
    //         { value: 1_000_000, serialized: [0, 15, 66, 64] },
    //         { value: 2_147_483_647, serialized: [127, 255, 255, 255] },
    //         { value: -1, serialized: [-1, -1, -1, -1] },
    //         { value: -12, serialized: [-1, -1, -1, -12] },
    //         { value: -42, serialized: [-1, -1, -1, -42] },
    //         { value: -96, serialized: [-1, -1, -1, -96] },
    //         { value: -127, serialized: [-1, -1, -1, -127] },
    //         { value: -128, serialized: [-1, -1, -1, -128] },
    //         { value: -192, serialized: [-1, -1, -1, -192] },
    //         { value: -255, serialized: [-1, -1, -1, 1] },
    //         { value: -256, serialized: [-1, -1, -1, 0] },
    //         { value: -1000, serialized: [-1, -1, 252, 24] },
    //         { value: -2_000_000_000, serialized: [136, 202, 108, 0] },
    //         { value: -2_147_483_647, serialized: [-128, 0, 0, 1] }
    //     ]
    // },
    // {
    //     nativeType: NativeType.INT64,
    //     serializeFn: byteify.serializeInt64,
    //     deserializeFn: byteify.deserializeInt64,
    //     tests: [
    //         { value: 0n, serialized: [0, 0, 0, 0, 0, 0, 0, 0] },
    //         { value: 1n, serialized: [0, 0, 0, 0, 0, 0, 0, 1] },
    //         { value: 42n, serialized: [0, 0, 0, 0, 0, 0, 0, 42] },
    //         { value: 127n, serialized: [0, 0, 0, 0, 0, 0, 0, 127] },
    //         { value: 128n, serialized: [0, 0, 0, 0, 0, 0, 0, 128] },
    //         { value: 192n, serialized: [0, 0, 0, 0, 0, 0, 0, 192] },
    //         { value: 255n, serialized: [0, 0, 0, 0, 0, 0, 0, 255] },
    //         { value: 256n, serialized: [0, 0, 0, 0, 0, 0, 1, 0] },
    //         { value: 1000n, serialized: [0, 0, 0, 0, 0, 0, 3, 232] },
    //         { value: 32_896n, serialized: [0, 0, 0, 0, 0, 0, 128, 128] },
    //         { value: 49_280n, serialized: [0, 0, 0, 0, 0, 0, 192, 128] },
    //         { value: 65_535n, serialized: [0, 0, 0, 0, 0, 0, 255, 255] },
    //         { value: 65_536n, serialized: [0, 0, 0, 0, 0, 1, 0, 0] },
    //         { value: 1_000_000n, serialized: [0, 0, 0, 0, 0, 15, 66, 64] },
    //         { value: 2_147_483_647n, serialized: [0, 0, 0, 0, 127, 255, 255, 255] },
    //         { value: -1n, serialized: [255, 255, 255, 255, 255, 255, 255, 255] },
    //         { value: -1024n, serialized: [255, 255, 255, 255, 255, 255, 252, 0] },
    //         { value: -2_000_000_000n, serialized: [255, 255, 255, 255, 136, 202, 108, 0] },
    //         { value: -2_147_483_648n, serialized: [255, 255, 255, 255, 128, 0, 0, 0] },
    //         { value: 9_223_372_036_854_775_807n, serialized: [127, 255, 255, 255, 255, 255, 255, 255] },
    //         { value: -9_223_372_036_854_775_808n, serialized: [128, 0, 0, 0, 0, 0, 0, 0] }
    //     ]
    // },
    // {
    //     nativeType: NativeType.FLOAT32,
    //     serializeFn: byteify.serializeFloat32,
    //     deserializeFn: byteify.deserializeFloat32,
    //     tests: [
    //         { value: 0, serialized: [0, 0, 0, 0] },
    //         { value: 1, serialized: [63, 128, 0, 0] },
    //         { value: 23.23, serialized: [65, 185, 215, 10] },
    //         { value: -23.23, serialized: [193, 185, 215, 10] }
    //     ]
    // },
    // {
    //     nativeType: NativeType.FLOAT64,
    //     serializeFn: byteify.serializeFloat64,
    //     deserializeFn: byteify.deserializeFloat64,
    //     tests: [
    //         { value: 0, serialized: [0, 0, 0, 0, 0, 0, 0, 0] },
    //         { value: 1, serialized: [63, 240, 0, 0, 0, 0, 0, 0] },
    //         { value: 23.23, serialized: [64, 55, 58, 225, 71, 174, 20, 123] },
    //         { value: -23.23, serialized: [192, 55, 58, 225, 71, 174, 20, 123] }
    //     ]
    // }
];

export default testCases;

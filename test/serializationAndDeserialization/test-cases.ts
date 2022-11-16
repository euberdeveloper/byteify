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
    }
];

export default testCases;

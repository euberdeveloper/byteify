import * as byteify from '../../source';

export interface TestCase<T> {
    name: string;
    serializeFn: (x: T) => Uint8Array;
    deserializeFn: (x: Uint8Array) => T;
    values: [T, number[]][];
    isFloatingPoint: boolean;
}

const testCases: TestCase<boolean | number>[] = [
    // ----- Bool
    {
        name: 'Bool',
        serializeFn: byteify.serializeBool,
        deserializeFn: byteify.deserializeBool,
        values: [
            [true, [1]],
            [false, [0]]
        ],
        isFloatingPoint: false
    },
    // ----- Uint
    {
        name: 'Uint8',
        serializeFn: byteify.serializeUint8,
        deserializeFn: byteify.deserializeUint8,
        values: [
            [0, [0]],
            [1, [1]],
            [12, [12]],
            [42, [42]],
            [127, [127]],
            [128, [128]],
            [192, [192]],
            [255, [255]]
        ],
        isFloatingPoint: false
    },
    {
        name: 'Uint16',
        serializeFn: byteify.serializeUint16,
        deserializeFn: byteify.deserializeUint16,
        values: [
            [0, [0, 0]],
            [1, [0, 1]],
            [42, [0, 42]],
            [127, [0, 127]],
            [128, [0, 128]],
            [192, [0, 192]],
            [255, [0, 255]],
            [256, [1, 0]],
            [1000, [3, 232]],
            [32896, [128, 128]],
            [49280, [192, 128]],
            [65535, [255, 255]]
        ],
        isFloatingPoint: false
    },
    {
        name: 'Uint32',
        serializeFn: byteify.serializeUint32,
        deserializeFn: byteify.deserializeUint32,
        values: [
            [0, [0, 0, 0, 0]],
            [1, [0, 0, 0, 1]],
            [42, [0, 0, 0, 42]],
            [127, [0, 0, 0, 127]],
            [128, [0, 0, 0, 128]],
            [192, [0, 0, 0, 192]],
            [255, [0, 0, 0, 255]],
            [256, [0, 0, 1, 0]],
            [1000, [0, 0, 3, 232]],
            [32896, [0, 0, 128, 128]],
            [49280, [0, 0, 192, 128]],
            [65535, [0, 0, 255, 255]],
            [65536, [0, 1, 0, 0]],
            [1000000, [0, 15, 66, 64]],
            [2147483647, [127, 255, 255, 255]],
            [2147483648, [128, 0, 0, 0]],
            [4294967295, [255, 255, 255, 255]]
        ],
        isFloatingPoint: false
    },
    {
        name: 'Uint64',
        serializeFn: byteify.serializeUint64,
        deserializeFn: byteify.deserializeUint64,
        values: [
            [0, [0, 0, 0, 0, 0, 0, 0, 0]],
            [1, [0, 0, 0, 0, 0, 0, 0, 1]],
            [42, [0, 0, 0, 0, 0, 0, 0, 42]],
            [127, [0, 0, 0, 0, 0, 0, 0, 127]],
            [128, [0, 0, 0, 0, 0, 0, 0, 128]],
            [192, [0, 0, 0, 0, 0, 0, 0, 192]],
            [255, [0, 0, 0, 0, 0, 0, 0, 255]],
            [256, [0, 0, 0, 0, 0, 0, 1, 0]],
            [1000, [0, 0, 0, 0, 0, 0, 3, 232]],
            [32896, [0, 0, 0, 0, 0, 0, 128, 128]],
            [49280, [0, 0, 0, 0, 0, 0, 192, 128]],
            [65535, [0, 0, 0, 0, 0, 0, 255, 255]],
            [65536, [0, 0, 0, 0, 0, 1, 0, 0]],
            [1000000, [0, 0, 0, 0, 0, 15, 66, 64]],
            [2147483647, [0, 0, 0, 0, 127, 255, 255, 255]],
            [2147483648, [0, 0, 0, 0, 128, 0, 0, 0]],
            [4294967295, [0, 0, 0, 0, 255, 255, 255, 255]],
            [4294967296, [0, 0, 0, 1, 0, 0, 0, 0]],
            [10000000000, [0, 0, 0, 2, 84, 11, 228, 0]],
            [281474976710655, [0, 0, 255, 255, 255, 255, 255, 255]],
            [281474976710656, [0, 1, 0, 0, 0, 0, 0, 0]],
            [10000000000000000, [0, 35, 134, 242, 111, 193, 0, 0]],
            [9007199254740991, [0, 31, 255, 255, 255, 255, 255, 255]],
            [9007199254740992, [0, 32, 0, 0, 0, 0, 0, 0]],
            [18446744073709549568, [255, 255, 255, 255, 255, 255, 248, 0]],
            // Because of the limitations of JavaScript, we can't test the full range of Uint64
            // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
            [18446744073709549569, [255, 255, 255, 255, 255, 255, 248, 0]]
        ],
        isFloatingPoint: false
    },
    // ----- Int
    {
        name: 'Int8',
        serializeFn: byteify.serializeInt8,
        deserializeFn: byteify.deserializeInt8,
        values: [
            [0, [0]],
            [1, [1]],
            [12, [12]],
            [42, [42]],
            [96, [96]],
            [127, [127]],
            [-1, [-1]],
            [-12, [-12]],
            [-42, [-42]],
            [-96, [-96]],
            [-127, [-127]]
        ],
        isFloatingPoint: false
    },
    {
        name: 'Int16',
        serializeFn: byteify.serializeInt16,
        deserializeFn: byteify.deserializeInt16,
        values: [
            [0, [0, 0]],
            [1, [0, 1]],
            [42, [0, 42]],
            [127, [0, 127]],
            [128, [0, 128]],
            [192, [0, 192]],
            [255, [0, 255]],
            [256, [1, 0]],
            [1000, [3, 232]],
            [32767, [127, 255]],
            [-1, [-1, -1]],
            [-12, [-1, -12]],
            [-42, [-1, -42]],
            [-96, [-1, -96]],
            [-127, [-1, -127]]
        ],
        isFloatingPoint: false
    },
    {
        name: 'Int32',
        serializeFn: byteify.serializeInt32,
        deserializeFn: byteify.deserializeInt32,
        values: [
            [0, [0, 0, 0, 0]],
            [1, [0, 0, 0, 1]],
            [42, [0, 0, 0, 42]],
            [127, [0, 0, 0, 127]],
            [128, [0, 0, 0, 128]],
            [192, [0, 0, 0, 192]],
            [255, [0, 0, 0, 255]],
            [256, [0, 0, 1, 0]],
            [1000, [0, 0, 3, 232]],
            [32896, [0, 0, 128, 128]],
            [49280, [0, 0, 192, 128]],
            [65535, [0, 0, 255, 255]],
            [65536, [0, 1, 0, 0]],
            [1000000, [0, 15, 66, 64]],
            [2147483647, [127, 255, 255, 255]],
            [-1, [-1, -1, -1, -1]],
            [-12, [-1, -1, -1, -12]],
            [-42, [-1, -1, -1, -42]],
            [-96, [-1, -1, -1, -96]],
            [-127, [-1, -1, -1, -127]],
            [-128, [-1, -1, -1, -128]],
            [-192, [-1, -1, -1, -192]],
            [-255, [-1, -1, -1, 1]],
            [-256, [-1, -1, -1, 0]],
            [-1000, [-1, -1, 252, 24]],
            [-2000000000, [136, 202, 108, 0]],
            [-2147483647, [-128, 0, 0, 1]]
        ],
        isFloatingPoint: false
    },
    {
        name: 'Int64',
        serializeFn: byteify.serializeInt64,
        deserializeFn: byteify.deserializeInt64,
        values: [
            [1, [0, 0, 0, 0, 0, 0, 0, 1]],
            [0, [0, 0, 0, 0, 0, 0, 0, 0]]
        ],
        isFloatingPoint: false
    },
    // ----- Float
    {
        name: 'Float32',
        serializeFn: byteify.serializeFloat32,
        deserializeFn: byteify.deserializeFloat32,
        values: [
            [1, [0, 0, 128, 63]],
            [0, [0, 0, 0, 0]],
            [23.3, [102, 102, 186, 65]]
        ],
        isFloatingPoint: true
    },
    {
        name: 'Float64',
        serializeFn: byteify.serializeFloat64,
        deserializeFn: byteify.deserializeFloat64,
        values: [
            [1, [0, 0, 0, 0, 0, 0, 240, 63]],
            [0, [0, 0, 0, 0, 0, 0, 0, 0]],
            [23.3, [205, 204, 204, 204, 204, 76, 55, 64]]
        ],
        isFloatingPoint: true
    }
];

export default testCases;

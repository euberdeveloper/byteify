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
            [1, [0, 0, 0, 1]],
            [0, [0, 0, 0, 0]]
        ],
        isFloatingPoint: false
    },
    {
        name: 'Uint64',
        serializeFn: byteify.serializeUint64,
        deserializeFn: byteify.deserializeUint64,
        values: [
            [1, [0, 0, 0, 0, 0, 0, 0, 1]],
            [0, [0, 0, 0, 0, 0, 0, 0, 0]]
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
            [32767, [127, 255]]
        ],
        isFloatingPoint: false
    },
    {
        name: 'Int32',
        serializeFn: byteify.serializeInt32,
        deserializeFn: byteify.deserializeInt32,
        values: [
            [1, [0, 0, 0, 1]],
            [0, [0, 0, 0, 0]]
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

import * as byteify from '../source';

interface ITestCase<T> {
    name: string;
    serializeFn: (x: T) => Uint8Array;
    deserializeFn: (x: Uint8Array) => T;
    values: [T, number[]][];
}

const testCases = [
    {
        name: 'Bool',
        serializeFn: byteify.serializeBool,
        deserializeFn: byteify.deserializeBool,
        values: [
            [true, [1]],
            [false, [0]]
        ]
    } as ITestCase<boolean>,
    {
        name: 'Uint8',
        serializeFn: byteify.serializeUint8,
        deserializeFn: byteify.deserializeInt8,
        values: [
            [1, [1]],
            [0, [0]]
        ]
    } as ITestCase<number>,
    {
        name: 'Uint16',
        serializeFn: byteify.serializeUint16,
        deserializeFn: byteify.deserializeUint16,
        values: [
            [1, [0, 1]],
            [0, [0, 0]]
        ]
    } as ITestCase<number>
];

export default testCases;

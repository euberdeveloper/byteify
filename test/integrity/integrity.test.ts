import { N_OF_BYTES } from '../../source/values/constants';
import { ByteifyCase, ByteifyOptions } from '../../source/modules/types';

import testCases from './testCases';
import { NativeType } from '../../source/types';

function testImmutabilityOfDeserializationInput(
    nativeType: NativeType,
    endianess: ByteifyCase,
    deserialize: (value: Uint8Array, options?: ByteifyOptions) => any
): void {
    const length = N_OF_BYTES[nativeType];
    const toDeserialize = new Uint8Array(length).fill(0).map((_, i) => i);
    const toDeserializeInitial = new Uint8Array(toDeserialize);
    deserialize(toDeserialize, { type: endianess });
    expect(toDeserialize).toStrictEqual(toDeserializeInitial);
}

describe('Test integrity', function () {
    describe('Immutability of input for deserialization', function () {
        for (const testCase of testCases) {
            describe(testCase.nativeType, function () {
                for (const endianess of Object.values(ByteifyCase)) {
                    it(`Should keep the input immutated for deserialization and endianess ${endianess}`, function () {
                        testImmutabilityOfDeserializationInput(testCase.nativeType, endianess, testCase.deserialize);
                    });
                }
            });
        }
    });
});
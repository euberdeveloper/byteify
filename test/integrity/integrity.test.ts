import { N_OF_BYTES } from '../../source/values';
import { ByteifyEndianess, ByteifyOptions } from '../../source/modules/types';

import testCases from './testCases';
import { NativeType } from '../../source/types';

function testImmutabilityOfDeserializationInput(
    nativeType: NativeType,
    endianess: ByteifyEndianess,
    deserialize: (value: number[], options?: ByteifyOptions) => any
): void {
    const length = N_OF_BYTES[nativeType];
    const toDeserialize = [...new Array(length).keys()].fill(0).map((_, i) => i);
    const toDeserializeInitial = [...toDeserialize];
    deserialize(toDeserialize, { endianess: endianess });
    expect(toDeserialize).toStrictEqual(toDeserializeInitial);
}

describe('Test integrity', function () {
    describe('Immutability of input for deserialization', function () {
        for (const testCase of testCases) {
            describe(testCase.nativeType, function () {
                for (const endianess of Object.values(ByteifyEndianess)) {
                    it(`Should keep the input immutated for deserialization and endianess ${endianess}`, function () {
                        testImmutabilityOfDeserializationInput(testCase.nativeType, endianess, testCase.deserialize);
                    });
                }
            });
        }
    });
});

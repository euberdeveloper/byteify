import { ByteifyEndianess, NativeType } from '../../source/types';

import { testImmutabilityOfDeserializationInput, testLittleEndianusedByDefault } from './utils';

import testCases from './testCases';

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

    describe('Little endian is used by default', function () {
        for (const testCase of testCases.filter(testCase => testCase.nativeType !== NativeType.BOOL)) {
            it(testCase.nativeType, function () {
                testLittleEndianusedByDefault(testCase.nativeType, testCase.serialize, testCase.deserialize);
            });
        }
    });
});

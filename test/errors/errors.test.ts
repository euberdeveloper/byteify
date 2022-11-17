import {
    testErrorDueToDecimalValue,
    testErrorDueToEmptyArray,
    testErrorDueToLargeValue,
    testErrorDueToSmallValue,
    testErrorDueToWrongArrayLength,
    testErrorDueToWrongType
} from './utils';

import testCases from './testCases';

describe('Test errored cases', function () {
    for (const testCase of testCases) {
        describe(testCase.nativeType, function () {
            describe('Serialize', function () {
                it('should throw an error due to wrong type', function () {
                    testErrorDueToWrongType(testCase.serialize, testCase.nativeType);
                });

                it('should throw an error due to decimal value', function () {
                    testErrorDueToDecimalValue(testCase.serialize, testCase.nativeType);
                });

                it('should throw an error due to value too small', function () {
                    testErrorDueToSmallValue(testCase.serialize, testCase.nativeType);
                });

                it('Should throw an error due to value too big', function () {
                    testErrorDueToLargeValue(testCase.serialize, testCase.nativeType);
                });
            });

            describe('Deserialize', function () {
                it('Should throw an error due to empty array', function () {
                    testErrorDueToEmptyArray(testCase.deserialize);
                });
                it('Should throw an error due to wrong array length', function () {
                    testErrorDueToWrongArrayLength(testCase.deserialize, testCase.nativeType);
                });
            });
        });
    }
});

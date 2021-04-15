import generalCases from './general-cases/general-cases.test';
import erroredCases from './errored-cases/errored-cases.test';

describe('byteify tests', function () {
    generalCases();
    erroredCases();
});

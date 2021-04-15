import * as byteify from '../../source';
import { assert } from 'chai';

export default function (): void {
    describe('Test errored cases', function () {
        describe('Uint8', function () {
            it('should throw an error due to wrong type', function () {
                assert.throws(() => byteify.serializeUint8(true as any));
                assert.throws(() => byteify.serializeUint8('string' as any));
                assert.throws(() => byteify.serializeUint8({} as any));
                assert.throws(() => byteify.serializeUint8([] as any));
            });

            it('should throw an error due to value too small', function () {
                assert.throws(() => byteify.serializeUint8(byteify.limits.MIN.uint8 - 1));
            });

            it('should throw an error due to value too big', function () {
                assert.throws(() => byteify.serializeUint8(byteify.limits.MAX.uint8 + 1));
            });
        });
    });
}

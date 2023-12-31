import { describe, expect, it } from 'vitest';
import { validate } from './api-plugin.validator';
import { ZodError } from 'zod';
describe('Api Validator', () => {
  describe('validate Api Plugin', () => {
    const createSerialiableApiPlugin = () => {
      return {
        name: 'ballerineEnrichment',
        url: 'https://simple-kyb-demo.s3.eu-central-1.amazonaws.com/mock-data/business_test_us.json',
        method: 'GET',
        stateNames: ['checkBusinessScore'],
        successAction: 'API_CALL_SUCCESS',
        errorAction: 'API_CALL_FAILURE',
        request: {
          transform: [
            {
              transformer: 'jmespath',
              mapping: '{data: entity.id}',
            },
          ],
        },
        response: {
          transform: [{ transformer: 'jmespath', mapping: '{result: @}' }],
        },
      };
    };

    describe('when api plugin is valid', () => {
      it('does not throw validation exception', async () => {
        expect(() => validate(createSerialiableApiPlugin())).not.toThrow();
      });
    });

    describe('when invalid plugin is valid - invalid request', () => {
      it('does not throw validation exception', async () => {
        const failingPlugin = createSerialiableApiPlugin();
        failingPlugin.request.transform[0].transformer = { someObjectKey: 'someObjectValue' };
        expect(() => validate(failingPlugin)).toThrowError(ZodError);
      });
    });

    describe('when invalid plugin is valid - missing callback', () => {
      it('does not throw validation exception', async () => {
        const failingPlugin = createSerialiableApiPlugin();
        failingPlugin.errorAction = undefined;
        expect(() => validate(failingPlugin)).toThrowError(ZodError);
      });
    });

    describe('when invalid plugin is valid - stateNames is string', () => {
      it('does not throw validation exception', async () => {
        const failingPlugin = createSerialiableApiPlugin();
        failingPlugin.stateNames = 'someState';
        expect(() => validate(failingPlugin)).toThrowError(ZodError);
      });
    });
  });
});

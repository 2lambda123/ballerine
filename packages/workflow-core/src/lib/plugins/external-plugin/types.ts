import { TJsonSchema, Transformers, Validator } from '../../utils';
import { THelperFormatingLogic } from '../../utils/context-transformers/types';

export interface ValidatableTransformer {
  transformers: Transformers;
  schemaValidator?: Validator;
}

export interface SerializableValidatableTransformer {
  transform: Array<{
    transformer: string;
    mapping: string | THelperFormatingLogic;
  }>;
  schema?: TJsonSchema;
}

export interface IApiPluginParams {
  name: string;
  stateNames: Array<string>;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET';
  request: ValidatableTransformer;
  response?: ValidatableTransformer;
  headers?: HeadersInit;
  successAction?: string;
  errorAction?: string;

  callApi?(...args: Array<any>): any;
}

export interface ISerializableApiPluginParams
  extends Omit<IApiPluginParams, 'request' | 'response'> {
  request: SerializableValidatableTransformer;
  response: SerializableValidatableTransformer;

  callApi?(...args: Array<any>): any;
}

export interface WebhookPluginParams {
  name: string;
  stateNames: Array<string>;
  url: string;
  method: IApiPluginParams['method'];
  headers: IApiPluginParams['headers'];
  request: Omit<IApiPluginParams['request'], 'schemaValidator'>;
}

export interface SerializableWebhookPluginParams extends Omit<WebhookPluginParams, 'request'> {
  name: string;
  stateNames: Array<string>;
  url: string;
  method: IApiPluginParams['method'];
  headers: IApiPluginParams['headers'];
  request: SerializableValidatableTransformer;
}
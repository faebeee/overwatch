import Joi from 'joi';
export declare const configLoader: <T>(filePattern: string, environmentFilter?: string[], schema?: Joi.Schema<any> | undefined) => Promise<T[]>;

import Joi from 'joi';
import * as logger from '../logger';
import { createEnvironmentFilter } from '../utils/filter-by-environment';
import loadFiles from '../utils/load-files';

export const configLoader = async <T>(filePattern: string, environmentFilter: string[] = [], schema?: Joi.Schema): Promise<T[]> => {
    const files = await loadFiles<T>( filePattern );
    return files
        .filter( createEnvironmentFilter( environmentFilter ) )
        .map( (config) => {
            if (!schema) {
                return config
            }
            logger.verbose( `Validating config file` );
            const { value, error } = schema.validate( config );
            if (error) {
                throw new Error( error.message );
            }
            return value;
        } )
}

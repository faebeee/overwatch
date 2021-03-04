import glob from 'glob';
import path from 'path';
import * as logger from '../logger';

export default function loadFiles<T>(pattern: string): Promise<T[]> {
    return new Promise( (resolve, reject) => {
        const configPath = path.join( process.cwd(), pattern );
        logger.debug( `Load files from ${ configPath }` );
        glob( configPath, {}, (err, files) => {
            if (err) {
                return reject( err );
            }

            return resolve( files.map( file => require( file ) ));
        } );
    } );
}

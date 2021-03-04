import * as log from 'fancylog';

enum LEVELS {
    ERROR,
    WARNING,
    INFO,
    VERBOSE,
    DEBUG
}

const LEVEL: LEVELS = process.env.LOG_LEVEL && parseInt(process.env.LOG_LEVEL) || LEVELS.WARNING;

process.env.NODE_ENV !== 'test' && console.log( `Use loglevel ${ LEVELS[LEVEL] }` );

export const debug = (str: any) => LEVELS.DEBUG <= LEVEL && log.debug( str );

export const error = (str: any) => LEVELS.ERROR <= LEVEL && log.error( str );

export const info = (str: any) => LEVELS.INFO <= LEVEL && log.info( str );

export const verbose = (str: any) => LEVELS.VERBOSE <= LEVEL && log.verbose( str );

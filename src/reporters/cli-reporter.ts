import logSymbols from 'log-symbols';
import { Reporter } from '../../types/Reporter';
import * as logger from '../logger';

export const CLIReporter: Reporter = {
    name: 'Console Reporter',

    addFail(testCase, project, message) {
        logger.info( `${ logSymbols.error } TestCase ${ testCase.name } failed on '${ project.name }'\n${ project.url } :: ${ message }` );
        return Promise.resolve();
    },

    addSuccess(testCase, project) {
        logger.info( `${ logSymbols.success } TestCase ${ testCase.name } succeeded on '${ project.name }'` );
        return Promise.resolve();
    },

    addSkip(testCase, project) {
        logger.info( `${ logSymbols.warning } TestCase ${ testCase.name } skipped on '${ project.name }'` );
        return Promise.resolve();
    },

    report(projects, testCases, durationMs) {
        logger.info( `Test cases completed. Totals: ${ projects.length } projects, ${ testCases.length } test cases, ${ Math.round( durationMs / 1000 ) }s ` );
        return Promise.resolve();
    },
};

export default CLIReporter;

import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { addFail, addSkip, addSuccess } from './reporter';

const { chromium, Response } = require( 'playwright' );
const ERROR_CODES = [400, 403, 404, 500, 502, 503];
const TIMEOUT = 10_000;

const shouldBeSkipped = (testCase: TestCase, project: Project) => {
    const isTestCaseInSkipClause = project.skipTestCase.includes( testCase.name );
    const matchEnvironments = testCase.environments.length > 0 ? testCase.environments.includes( project.environment ) : true;
    return !matchEnvironments || isTestCaseInSkipClause;
}

export const createTestCaseRunner = (testCase: TestCase) => async (project: Project) => {
    if (shouldBeSkipped( testCase, project )) {
        return addSkip( testCase, project );
    }

    const browser = await chromium.launch( { headless: false } );  // Or 'firefox' or 'webkit'.
    const page = await browser.newPage();

    try {
        // Only fetch the first response which SHOULD be the document itself (hopefully)
        page.once( 'response', (response: Response) => {
            if (ERROR_CODES.includes( response.status )) {
                throw new Error( response.statusText );
            }
        } );

        const timeout = setTimeout( () => {
            throw new Error( `${ testCase.name } timed out on ${ project.name }` );
        }, TIMEOUT );
        await testCase.exec( project, page );
        clearTimeout( timeout );
        await browser.close();
        return addSuccess( testCase, project );
    } catch (error) {
        return addFail( testCase, project, error.message );
    }

}

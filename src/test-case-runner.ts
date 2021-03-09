import { Page } from 'playwright';
import { PageEvent } from 'typedoc/dist/lib/output/events';
import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { addFail, addSkip, addSuccess } from './reporter';
import { shouldTestcaseBeSkipped } from './utils/should-testcase-be-skipped';

const { chromium } = require( 'playwright' );
const ERROR_CODES = [400, 403, 404, 500, 502, 503];
const TIMEOUT = 10_000;

const execTestCase = async (testCase: TestCase, project: Project, page: Page) => {
    if (project.pre) {
        await project.pre( page );
    }

    if (testCase.requireAuth && project.loginScript) {
        await project.loginScript( page );
    }

    const timeout = setTimeout( () => {
        throw new Error( `${ testCase.name } timed out on ${ project.name }` );
    }, TIMEOUT );
    await testCase.exec( project, page );
    clearTimeout( timeout );
}

export const createTestCaseRunner = (testCase: TestCase) => async (project: Project) => {
    if (shouldTestcaseBeSkipped( testCase, project )) {
        return addSkip( testCase, project );
    }
    
    if (testCase.requireAuth && !project.loginScript) {
        return addFail( testCase, project, `Login implementation required` );
    }

    const browser = await chromium.launch( { headless: testCase.headless ?? true } );
    const page = await browser.newPage();

    try {
        // Only fetch the first response which SHOULD be the document itself (hopefully)
        page.once( 'response', (response: Response) => {
            if (ERROR_CODES.includes( response.status )) {
                throw new Error( response.statusText );
            }
        } );

        await execTestCase(testCase, project, page);
        await browser.close();
        return addSuccess( testCase, project );
    } catch (error) {
        await browser.close();
        return addFail( testCase, project, error.message );
    }
}

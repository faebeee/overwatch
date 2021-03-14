import { loadProjects, loadTestCases } from './index';
import * as logger from './logger';
import { addReporter } from './reporter';
import CLIReporter from './reporters/cli-reporter';
import { runner } from './runner';

/**
 * Main executing function
 * @param environments List of envrionments. This will filter the loaded projects and test cases
 * @param configFilePattern glob pattern relative to `process.cwd()` to load project config files
 * @param testCaseFilePattern glob pattern relative to `process.cwd()` to load test case files
 */
export default async (environments: string[], configFilePattern: string, testCaseFilePattern: string) => {
    addReporter( CLIReporter );
    environments?.length > 0 && logger.info( `Run tests for environments ${ environments.join( ',' ) }` );

    const testCases = await loadTestCases( environments, testCaseFilePattern );
    const projects = await loadProjects( environments, configFilePattern );
    await runner( testCases, projects );
};

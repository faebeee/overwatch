import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { configLoader } from './loader/config-loader';
import { addReporter } from './reporter';
import CLIReporter from './reporters/cli-reporter';
import { projectSchema } from './schemas/project-schema';
import { testCaseSchema } from './schemas/test-case-schema';
import { testExecutor } from './test-executor';

/**
 * Main executing function
 * @param environments List of envrionments. This will filter the loaded projects and test cases
 * @param configFilePattern glob pattern relative to `process.cwd()` to load project config files
 * @param testCaseFilePattern glob pattern relative to `process.cwd()` to load test case files
 */
export default async (environments: string[], configFilePattern: string, testCaseFilePattern: string) => {
    addReporter( CLIReporter )

    const testCases = await configLoader<TestCase>( testCaseFilePattern, environments, testCaseSchema );
    const projects = await configLoader<Project>( configFilePattern, environments, projectSchema );
    await testExecutor( testCases, projects );
};

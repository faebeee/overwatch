import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { configLoader } from './loader/config-loader';
import { addReporter } from './reporter';
import CLIReporter from './reporters/cli-reporter';
import { testExecutor } from './test-executor';

export const useReporter = addReporter;

export default async (environments: string[], configFilePattern: string, testCaseFilePattern: string) => {
    addReporter( CLIReporter )

    const testCases = await configLoader<TestCase>( testCaseFilePattern, environments );
    const projects = await configLoader<Project>( configFilePattern, environments );
    await testExecutor( testCases, projects );
};

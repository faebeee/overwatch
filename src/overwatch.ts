import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { configLoader } from './loader/config-loader';
import { addReporter } from './reporter';
import CLIReporter from './reporters/cli-reporter';
import { projectSchema } from './schemas/project-schema';
import { testCaseSchema } from './schemas/test-case-schema';
import { testExecutor } from './test-executor';

export const useReporter = addReporter;

export default async (environments: string[], configFilePattern: string, testCaseFilePattern: string) => {
    addReporter( CLIReporter )

    const testCases = await configLoader<TestCase>( testCaseFilePattern, environments, testCaseSchema );
    const projects = await configLoader<Project>( configFilePattern, environments, projectSchema );
    await testExecutor( testCases, projects );
};

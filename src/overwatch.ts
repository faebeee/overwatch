import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { configLoader } from './loader/config-loader';
import { addReporter } from './reporter';
import CLIReporter from './reporters/cli-reporter';
import { createTestCaseRunner } from './test-case-runner';

export default async function (environments: string[], configFilePattern: string, testCaseFilePattern: string) {
    addReporter( CLIReporter )
    const testCases = await configLoader<TestCase>( testCaseFilePattern, environments );
    const projects = await configLoader<Project>( configFilePattern, environments );

    for (let t = 0; t < testCases.length; t++) {
        const testCaseRunner = createTestCaseRunner( testCases[t] );

        for (let p = 0; p < projects.length; p++) {
            await testCaseRunner( projects[p] );
        }
    }
}

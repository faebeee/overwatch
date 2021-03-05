import { performance } from 'perf_hooks';
import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { report } from './reporter';
import { createTestCaseRunner } from './test-case-runner';

export const testExecutor = async (testCases: TestCase[], projects: Project[]) => {
    const then = performance.now();
    for (let t = 0; t < testCases.length; t++) {
        const testCaseRunner = createTestCaseRunner( testCases[t] );

        for (let p = 0; p < projects.length; p++) {
            await testCaseRunner( projects[p] );
        }
    }

    const now = performance.now();
    report( projects, testCases, now - then );
}

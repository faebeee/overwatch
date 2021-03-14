import { performance } from 'perf_hooks';
import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import * as logger from './logger';
import { report } from './reporter';
import { createTestCaseRunner } from './test-case-runner';

export const runner = async (testCases: TestCase[], projects: Project[]) => {
    logger.info( `Running ${ testCases.length } test case(s) on ${ projects.length } project(s)` );

    const then = performance.now();
    for (let t = 0; t < testCases.length; t++) {
        for (let p = 0; p < projects.length; p++) {
            await createTestCaseRunner( testCases[t], projects[p] );
        }
    }

    const now = performance.now();
    await report( projects, testCases, now - then );
}

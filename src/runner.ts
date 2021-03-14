import Joi from 'joi';
import { performance } from 'perf_hooks';
import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import * as logger from './logger';
import { report } from './reporter';
import { projectSchema } from './schemas/project-schema';
import { testCaseSchema } from './schemas/test-case-schema';
import { createTestCaseRunner } from './test-case-runner';

const validateConfig = (config: TestCase | Project, schema: Joi.Schema) => {
    const { value, error } = schema.validate( config );
    if (error) {
        throw new Error( error.message );
    }
    return value;
}

export const runner = async (testCases: TestCase[], projects: Project[]) => {
    logger.verbose( `Validate ${ testCases.length } test case(s) and ${ projects.length } project(s)` );
    testCases.forEach( (testCase) => {
        logger.debug( `Validate testCase ${ testCase.name }` );
        validateConfig( testCase, testCaseSchema );
    } );

    projects.forEach( (project) => {
        logger.debug( `Validate project config ${ project.name }` );
        validateConfig( project, projectSchema );
    } );

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

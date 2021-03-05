import { Project } from '../types/Project';
import { Reporter } from '../types/Reporter';
import { TestCase } from '../types/TestCase';
import * as logger from './logger';

let reporters: Reporter[] = [];

export const addReporter = (reporter: Reporter) => {
    reporters.push( reporter );
    logger.info( `Add reporter ${ reporter.name }` );
};

export const clearReporters = () => {
    reporters = [];
    logger.info( `Remove all reporters` );
};

export const addFail = (testCase: TestCase, project: Project, errorMessage?: string) => Promise.all( reporters.map( reporter => reporter.addFail ? reporter.addFail( testCase, project, errorMessage ) : Promise.resolve() ) );

export const addSkip = (testCase: TestCase, project: Project, errorMessage?: string) => Promise.all( reporters.map( reporter => reporter.addSkip ? reporter.addSkip( testCase, project, errorMessage ) : Promise.resolve() ) );

export const addSuccess = (testCase: TestCase, project: Project) => Promise.all( reporters.map( reporter => reporter.addSuccess ? reporter.addSuccess( testCase, project ) : Promise.resolve() ) );

export const report = (projects: Project[], testCases: TestCase[], durationMs: number) => Promise.all( reporters.map( reporter => reporter.report ? reporter.report( projects, testCases, durationMs ) : Promise.resolve() ) );

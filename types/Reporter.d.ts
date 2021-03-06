import { Project } from './Project';
import { TestCase } from './TestCase';

export interface Reporter {
    /**
     * Name of the reporter
     */
    name: string;

    /**
     * Add failed test case
     */
    addFail?: (testCase: TestCase, project: Project, errorMessage?: string) => Promise<void>;

    /**
     * Add succeeded test case
     */
    addSuccess?: (testCase: TestCase, project: Project, errorMessage?: string) => Promise<void>;

    /**
     * Add skipped test case
     */
    addSkip?: (testCase: TestCase, project: Project, errorMessage?: string) => Promise<void>;

    /**
     * Final report after all testcases have been executed
     */
    report?: (projects: Project[], testCases: TestCase[], duration: number) => Promise<void>;
}

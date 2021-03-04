import { Project } from './Project';
import { TestCase } from './TestCase';

export interface Reporter {
    name: string;
    addFail?: (testCase: TestCase, project: Project, errorMessage?: string) => Promise<void>;
    addSuccess?: (testCase: TestCase, project: Project, errorMessage?: string) => Promise<void>;
    addSkip?: (testCase: TestCase, project: Project, errorMessage?: string) => Promise<void>;
    report?: (projects: Project[], testCases: TestCase[], duration: number) => Promise<void>;
}

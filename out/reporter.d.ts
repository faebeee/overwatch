import { Project } from '../types/Project';
import { Reporter } from '../types/Reporter';
import { TestCase } from '../types/TestCase';
export declare const addReporter: (reporter: Reporter) => void;
export declare const clearReporters: () => void;
export declare const addFail: (testCase: TestCase, project: Project, errorMessage?: string | undefined) => Promise<void[]>;
export declare const addSkip: (testCase: TestCase, project: Project, errorMessage?: string | undefined) => Promise<void[]>;
export declare const addSuccess: (testCase: TestCase, project: Project) => Promise<void[]>;
export declare const report: (projects: Project[], testCases: TestCase[], durationMs: number) => Promise<void[]>;

import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
export declare const createTestCaseRunner: (testCase: TestCase) => (project: Project) => Promise<void[]>;

import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
export declare const testExecutor: (testCases: TestCase[], projects: Project[]) => Promise<void>;

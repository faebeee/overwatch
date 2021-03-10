import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
export declare const runner: (testCases: TestCase[], projects: Project[]) => Promise<void>;

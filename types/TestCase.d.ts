import { Page } from 'playwright';
import { Project } from './Project';

export interface TestCase {
    // Name of the test case
    name: string;

    // What environments should the testcase run on
    environments: string[];

    // Does the testcase require to be logged in
    requireAuth: boolean;

    // Can be turned on the see the browser. This might help for debugging test cases
    headless?: boolean;

    // Execute testcase
    exec: (project: Project, page: Page) => Promise<void>;
}

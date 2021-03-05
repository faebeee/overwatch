import { Page } from 'playwright';

export interface Project {
    // Name of the project
    name: string;

    // url of the project
    url: string;

    // Skip testcases by name
    skipTestCase: string[];

    // Name of the environment
    environment: string;

    // Script run at the beginning. Even before `Project.loginScript`
    pre?: (page: Page) => Promise<void>;

    // Custom login script
    loginScript?: (page: Page) => Promise<void>;
}

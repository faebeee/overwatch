import { Page } from 'playwright';
import { Project } from './Project';

export interface TestCase {
    name: string;
    environments: string[];
    requireAuth: boolean,
    exec: (project: Project, page: Page) => Promise<void>
}

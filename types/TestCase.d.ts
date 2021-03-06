import { Page } from 'playwright';
import { Project } from './Project';

export interface TestCase {
    /**
     * Name of the test case
     */
    name: string;

    /**
     * What environments should the testcase run on
     */
    environments: string[];

    /**
     *  Does the testcase require to be logged in
     */
    requireAuth: boolean;

    /**
     * Can be turned on the see the browser. This might help for debugging test cases
     */
    headless?: boolean;

    /**
     *  Execute testcase
     *  @see https://playwright.dev/docs/api/class-playwright for playwright API
     *  @example ```js
     *  async exec(project, page) {
     *      const isElementVisible = async (page, selector) => {
     *          assert.ok(await page.isVisible(selector), `${ selector } not visible`);
     *      };
     *      const { url } = project;
     *      await page.goto(`${url}/my-subpage`);
     *      await isElementVisible(page, 'div.my-element');
     *  }
     *  ```
     */
    exec: (project: Project, page: Page) => Promise<void>;
}

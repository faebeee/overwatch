import { Page } from 'playwright';

export interface Project {
    /**
     *  Name of the project
     */
    name: string;

    /**
     * url of the project
     */
    url: string;

    /**
     * Skip testcases by name
     */
    skipTestCase: string[];

    /**
     * Name of the environment
     */
    environment: string;

    /**
     * Script run at the beginning. Even before `Project.loginScript`
     * @see https://playwright.dev/docs/api/class-playwright for playwright API
     */
    pre?: (page: Page) => Promise<void>;

    /**
     * Script runs at the end. This can be used for cleaning up
     * @see https://playwright.dev/docs/api/class-playwright for playwright API
     */
     post?: (page: Page) => Promise<void>;

    /**
     * Login implementation. This is called if a testcase  has `requireAuth : true`
     * @see https://playwright.dev/docs/api/class-playwright for playwright API
     * @example ```
     * async loginScript(page) {
     *     await page.goto(this.url+"/login");
     *     await page.fill('[name="_username"]', 'foo');
     *     await page.fill('[name="_password"]', 'bar');
     *     await page.click('[name="_submit"]');
     *     await page.waitForLoadState();
     * }
     * ```
     */
    loginScript?: (page: Page) => Promise<void>;
}

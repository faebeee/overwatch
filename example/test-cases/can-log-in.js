/**
 * @type {TestCase}
 */
module.exports = {
    name: 'can-log-in',
    environments: ['prod'],
    requireAuth: true,
    headless: true,

    /**
     * @param {Project} project
     * @param {Page} page
     * @return {Promise<void> | Promise<unknown>}
     */
    async exec(project, page) {
        await page.goto(project.url);
    },
}

/**
 * @type {TestCase}
 */
module.exports = {
    name: 'is-online',
    environments: ['prod'],
    requireAuth: false,
    headless: true,

    /**
     * @param {Project} project
     * @param {Page} page
     * @return {Promise<void> | Promise<unknown>}
     */
    exec: async (project, page) => {
        await page.goto(project.url);
    },
}

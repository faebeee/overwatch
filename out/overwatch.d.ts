declare const _default: (environments: string[], configFilePattern: string, testCaseFilePattern: string) => Promise<void>;
/**
 * Main executing function
 * @param environments List of envrionments. This will filter the loaded projects and test cases
 * @param configFilePattern glob pattern relative to `process.cwd()` to load project config files
 * @param testCaseFilePattern glob pattern relative to `process.cwd()` to load test case files
 */
export default _default;

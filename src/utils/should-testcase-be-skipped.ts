import { Project } from '../../types/Project';
import { TestCase } from '../../types/TestCase';

export const shouldTestcaseBeSkipped = (testCase: TestCase, project: Project) => {
    const isTestCaseInSkipClause = project.skipTestCase.includes( testCase.name );
    const matchEnvironments = testCase.environments.length > 0 ? testCase.environments.includes( project.environment ) : true;
    return !matchEnvironments || isTestCaseInSkipClause;
}

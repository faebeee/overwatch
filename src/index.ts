import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { configLoader } from './loader/config-loader';
import overwatch from './overwatch';
import { addReporter } from './reporter';
import datadogReporter from './reporters/datadog-reporter';
import slackReporter from './reporters/slack-reporter';
import { projectSchema } from './schemas/project-schema';
import { testCaseSchema } from './schemas/test-case-schema';
import { runner } from './runner';

export const loadTestCases = (environments: string[], filePattern: string) => configLoader<TestCase>( filePattern, environments, testCaseSchema );
export const loadProjects = (environments: string[], filePattern: string) => configLoader<Project>( filePattern, environments, projectSchema );

export {
    runner,
    datadogReporter,
    slackReporter,
    addReporter,
    overwatch,
}

import { Project } from '../types/Project';
import { TestCase } from '../types/TestCase';
import { configLoader } from './loader/config-loader';
import overwatch from './overwatch';
import { addReporter } from './reporter';
import datadogReporter from './reporters/datadog-reporter';
import slackReporter from './reporters/slack-reporter';
import { runner } from './runner';

export const loadTestCases = (environments: string[], filePattern: string) => configLoader<TestCase>( filePattern, environments );
export const loadProjects = (environments: string[], filePattern: string) => configLoader<Project>( filePattern, environments );

export {
    runner,
    datadogReporter,
    slackReporter,
    addReporter,
    overwatch,
}

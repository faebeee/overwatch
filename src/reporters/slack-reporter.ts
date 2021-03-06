import { IncomingWebhook } from '@slack/webhook';
import { Project } from '../../types/Project';
import { Reporter } from '../../types/Reporter';
import { TestCase } from '../../types/TestCase';
import * as logger from '../logger';

type ReportResult = {
    scenario: TestCase,
    config: Project,
    success: boolean,
    message?: string | null,
};

const results: ReportResult[] = [];

const getFailed = () => results.filter( r => !r.success );
const getSuccess = () => results.filter( r => r.success );
const getTotalFailed = () => getFailed().length;
const hasFailed = () => getTotalFailed() > 0;

const createReportBlocks = () => {
    const blocks = [];
    const failedScenarios = getFailed();
    for (let i = 0; i < failedScenarios.length; i++) {
        const { scenario, config, message } = failedScenarios[i];
        blocks.push( {
            type: 'context',
            elements: [
                {
                    type: 'plain_text',
                    text: `:x: *${ scenario.name }* on ${ config.url }\n${ message }`,
                    emoji: true,
                },
            ],
        } );

        blocks.push( {
            type: 'divider',
        } );
    }
    return blocks;
};

/**
 * Creates a slack reporter. This will create a list of failed/succeeded test cases and send
 * them to a webhook
 *
 * @param slackWebhookUrl
 */
export default (slackWebhookUrl: string): Reporter => ({
    name: 'Slack Reporter',

    addFail(scenario, config, message) {
        results.push( { scenario, config, success: false, message } );
        return Promise.resolve();
    },

    addSuccess(scenario, config) {
        results.push( { scenario, config, success: true, message: null } );
        return Promise.resolve();
    },

    async report(instances, scenarios, durationMs) {
        const webhook = new IncomingWebhook( slackWebhookUrl );
        logger.verbose( `Notify slack` );

        await webhook.send( {
            username: 'goTom E2E',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `${ hasFailed() ? ':x:' : ':rocket:' } E2E tests completed.\n\nSummary\n:white_check_mark: ${ getSuccess().length } succeeded\n:x: ${ getFailed().length } failed`,
                    },
                },
                {
                    type: 'divider',
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Overview\n:stopwatch: Duration: ~${ Math.round(durationMs / 1000) }s\n:runner: Scenarios: ${ scenarios.length }\n:computer: Instances: ${ instances.length }`,
                    },
                },
                {
                    type: 'divider',
                },
                ...createReportBlocks(),
            ],
        } );
    },
});

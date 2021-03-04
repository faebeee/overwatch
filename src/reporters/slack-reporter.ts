import { IncomingWebhook } from '@slack/webhook';
import { Reporter } from '../../types/Reporter';
import * as logger from '../logger';

const results = [];

const getFailed = () => results.filter( r => !r.success );
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

export const SlackReporter: Reporter = {
    name: 'Slack Reporter',

    addFail(scenario, config, message) {
        results.push( { scenario, config, success: false, message } );
        return Promise.resolve();
    },

    addSuccess(scenario, config) {
        results.push( { scenario, config, success: true, message: null } );
        return Promise.resolve();
    },

    async report(instances, scenarios, duration) {
        const webhook = new IncomingWebhook( process.env.SLACK_WEBHOOK_URL );
        logger.verbose( `Notify slack` );

        await webhook.send( {
            username: 'goTom E2E',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `${ hasFailed() ? ':x:' : ':rocket:' } E2E tests completed.\n:stopwatch: Duration: ~${ duration }s\n:runner:Scenarios: ${ scenarios }\n:computer: Instances: ${ instances }`,
                    },
                },
                {
                    type: 'divider',
                },
                ...createReportBlocks(),
            ],
        } );
    },
};

export default SlackReporter;

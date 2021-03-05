#!/usr/bin/env node

import overwatch, { useReporter } from './src/overwatch';
import datadogReporter from './src/reporters/datadog-reporter';
import slackReporter from './src/reporters/slack-reporter';

process.env.SLACK_WEBHOOK_URL && useReporter( slackReporter( process.env.SLACK_WEBHOOK_URL ) );
process.env.DD_CLIENT_API_KEY && useReporter( datadogReporter( process.env.DD_CLIENT_API_KEY ) );

overwatch( [], './configs/projects/**/*.js', './configs/test-cases/**/*.js')

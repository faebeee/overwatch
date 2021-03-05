#!/usr/bin/env node

import { addReporter, datadogReporter, slackReporter, overwatch } from 'ui-overwatch';

process.env.SLACK_WEBHOOK_URL && addReporter( slackReporter( process.env.SLACK_WEBHOOK_URL ) );
process.env.DD_CLIENT_API_KEY && addReporter( datadogReporter( process.env.DD_CLIENT_API_KEY ) );

overwatch( [], './projects/**/*.js', './test-cases/**/*.js')

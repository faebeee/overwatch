#!/usr/bin/env node

import { addReporter, datadogReporter, slackReporter, overwatch } from '../index';

process.env.SLACK_WEBHOOK_URL && addReporter( slackReporter( process.env.SLACK_WEBHOOK_URL ) );
process.env.DD_CLIENT_API_KEY && addReporter( datadogReporter( process.env.DD_CLIENT_API_KEY ) );

overwatch( [], './example/projects/**/*.js', './example/test-cases/**/*.js')

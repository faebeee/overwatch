#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
process.env.SLACK_WEBHOOK_URL && index_1.addReporter(index_1.slackReporter(process.env.SLACK_WEBHOOK_URL));
process.env.DD_CLIENT_API_KEY && index_1.addReporter(index_1.datadogReporter(process.env.DD_CLIENT_API_KEY));
index_1.overwatch([], './example/projects/**/*.js', './example/test-cases/**/*.js');

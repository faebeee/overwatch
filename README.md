# ui-overwatch
[![Maintainability](https://api.codeclimate.com/v1/badges/d3df9380db1ac4b91171/maintainability)](https://codeclimate.com/github/faebeee/overwatch/maintainability)
![npm](https://img.shields.io/npm/v/ui-overwatch?style=for-the-badge)

`ui-overwatch` is a tool, which should help to keep the functionality
of your UI/Application across instances working. This comes in handy,
if you have the same application running on several instances.

With overwatch, you configure a project, and define test scenarios.
Those test scenarios will run against every project configured and alarm you
if some tests fail.

Those test scenarios are executed using [playwright](https://playwright.dev/).

## Install
`npm install ui-overwatch`

## CLI
Checkout [ui-overwatch-cli](https://github.com/ui-overwatch/overwatch-cli) project for the official CLI

## How To
Check out the `example` folder for project and test case configuration.

Provide the file pattern and let overwatch do the magic
```js
import { addReporter, datadogReporter, slackReporter, overwatch } from 'ui-overwatch';

addReporter( slackReporter( process.env.SLACK_WEBHOOK_URL ) );
addReporter( datadogReporter( process.env.DD_CLIENT_API_KEY ) );

overwatch( [], './projects/**/*.js', './test-cases/**/*.js');
```

Or load the files and pass the objects into the runner. This way you can have your own
implementation of config files.

```js
import { addReporter, datadogReporter, slackReporter, runner, loadProjects, loadTestCases } from 'ui-overwatch';

addReporter( slackReporter( process.env.SLACK_WEBHOOK_URL ) );
addReporter( datadogReporter( process.env.DD_CLIENT_API_KEY ) );

const environments = ['prod'];
const projects = await loadProject(environments, './projects/**/*.js');
const testCases = await loadTestCases(environments, './test-cases/**/*.js');

await runner(testCases, projects);
```

__CLI Output__

![CLI Output](https://github.com/faebeee/overwatch/raw/master/assets/cli-output.png)

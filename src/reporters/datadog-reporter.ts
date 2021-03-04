import axios from 'axios';
import { Project } from '../../types/Project';
import { Reporter } from '../../types/Reporter';
import { TestCase } from '../../types/TestCase';
import * as logger from '../logger';

const submitEvent = (scenario: TestCase, config: Project, successful: boolean, message: string = null) => {
    const data = {
        alert_type: successful ? 'success' : 'error',
        host: config.url,
        title: `Scenario ${ scenario.name } ${ successful ? 'succeeded' : 'failed' }`,
        device_name: 'goTom:E2E',
        tags: [config.environment, `environment:${ process.env.NODE_ENV || 'development' }`],
        text: JSON.stringify( {
            host: config.url,
            scenario: scenario.name,
            message: message,
        } ),
    };

    logger.debug( `Sending event to datadog ${ JSON.stringify( data ) }` );

    return axios.post( `https://api.datadoghq.com/api/v1/events?api_key=${ process.env.DD_CLIENT_API_KEY }`, data );
};

export const DataDogReporter: Reporter = {
    name: 'DataDog Reporter',
    async addFail(scenario, config, message) {
        await submitEvent( scenario, config, false, message );
    },
    async addSuccess(scenario, config) {
        await submitEvent( scenario, config, true );
    },
};

export default DataDogReporter;

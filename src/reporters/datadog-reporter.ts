import axios from 'axios';
import { Project } from '../../types/Project';
import { Reporter } from '../../types/Reporter';
import { TestCase } from '../../types/TestCase';
import * as logger from '../logger';

const submitEvent = (environment: string, apiKey: string, scenario: TestCase, config: Project, successful: boolean, message?: string) => {
    const data = {
        alert_type: successful ? 'success' : 'error',
        host: config.url,
        title: `Scenario ${ scenario.name } ${ successful ? 'succeeded' : 'failed' }`,
        device_name: 'goTom:E2E',
        tags: [config.environment, `environment:${ environment }`],
        text: JSON.stringify( {
            host: config.url,
            scenario: scenario.name,
            message: message,
        } ),
    };

    logger.debug( `Sending event to datadog ${ JSON.stringify( data ) }` );

    return axios.post( `https://api.datadoghq.com/api/v1/events?api_key=${ apiKey }`, data );
};

export default (dataDogClientApiKey: string, environment = process.env.NODE_ENV || 'development'): Reporter => ({
    name: 'DataDog Reporter',
    async addFail(scenario, config, message) {
        await submitEvent( environment, dataDogClientApiKey, scenario, config, false, message );
    },
    async addSuccess(scenario, config) {
        await submitEvent( environment, dataDogClientApiKey, scenario, config, true );
    },
});

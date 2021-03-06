import { Reporter } from '../../types/Reporter';
declare const _default: (slackWebhookUrl: string) => Reporter;
/**
 * Creates a slack reporter. This will create a list of failed/succeeded test cases and send
 * them to a webhook
 *
 * @param slackWebhookUrl
 */
export default _default;

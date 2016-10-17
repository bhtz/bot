// Import
import {Controller} from 'microscope-web';
import {rhbot} from '../bot/RHBot';
var builder = require('botbuilder');

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '9a1c8d20-7440-4434-a7ea-13d1e1a0c623',
    appPassword: 'nXch1gUv3KeVnPqi8VVW3rm'
});

var bot = new builder.UniversalBot(connector);
rhbot(bot);

/**
 * Bot Http controller
 */
class BotController extends Controller {

    initialize(){
        this.router.post('/bot/messages/', connector.listen());
    }
}


export default BotController;
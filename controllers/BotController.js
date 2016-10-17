// Import
import {Controller} from 'microscope-web';
import {rhbot} from '../bot/RHBot';
var builder = require('botbuilder');

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '54237f21-42c2-432c-a44a-3c538343d324',
    appPassword: 'a59exfgGeh8CLmxoq4K9sy4'
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
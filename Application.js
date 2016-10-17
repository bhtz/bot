// Imports
import {HttpApplication} from 'microscope-web';
import HomeController from './controllers/HomeController';
import BotController from './controllers/BotController';
import {commons, engine} from './middlewares/commons';

class Application extends HttpApplication {
	
	get configurations(){
		return {
			'view engine': 'html',
			'view cache': false,
			'views':  __dirname + '/views'
		};
	}

	get port(){
		return process.env.port || process.env.PORT || 3978;
	}
	
	get middlewares(){
		return [commons, engine];
	}

	get controllers(){
		return [HomeController, BotController];
	}
}

// babel-register fix !
module.exports = Application;
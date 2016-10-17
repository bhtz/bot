// Import
import {Controller} from 'microscope-web';
import {basicAuth} from '../filters/commonFilters';

class HomeController extends Controller {

	get filters(){
		return [basicAuth];
	}

	get routes(){
		return {
			'get /': 'index',
			'get /home/about': 'about',
			'get /home/demo': 'demo'
		}
	}

	// index action
	// GET /
	index(request, response){
		response.render('home/index');
	}

	// about action
	// GET /home/about
	about(request, response){
		response.render('home/about');
	}

	// about action
	// GET /home/about
	demo(request, response){
		response.render('home/demo');
	}
}

export default HomeController;
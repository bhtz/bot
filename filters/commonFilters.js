var auth = require('basic-auth');

// sample controller filter
export function logIp(req, res, next) {
	console.log(req.ip);
	next();
};

// sample action filter
export function logUrl(req, res, next) {
	console.log(req.url);
	next();
};

export function basicAuth(req, res, next) {
		var user = auth(req);
		if (!user || !user.name || !user.pass) {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			res.sendStatus(401);
			return;
		}
		if (user.name === 'bhtz' && user.pass === 'admin') {
			next();
		} else {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			res.sendStatus(401);
			return;
		}
	}
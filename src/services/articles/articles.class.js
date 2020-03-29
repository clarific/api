const { Service } = require('feathers-mongoose');

exports.Articles = class Articles extends Service {
	async find(params) {
		return { message: "Hula hula!!! :)" }
	}
};

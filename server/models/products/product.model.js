const data = require('./dummy-data');

module.exports = {
	async findProducts({id}) {
		//hard coding our dummy data
		return data;
	},
};
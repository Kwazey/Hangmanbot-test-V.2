const { Events } = require('discord.js');

module.exports = {
	name: Events.StartEventer,
	async execute(hi) {
		console.log("startevent did ting");
		console.log(hi)

	},
};
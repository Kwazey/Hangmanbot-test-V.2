const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 10,
	category : 'utility',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({content: 'Pong!'});
		//const message = await interaction.fetchReply();
		//console.log(message.content);
	},
};
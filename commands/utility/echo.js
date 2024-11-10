const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./start');

module.exports = {
	category : 'utility',
data: new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back'))
	.addBooleanOption(option =>
		option.setName('ephemeral')
			.setDescription('Whether or not the echo should be ephemeral')),
		async execute(interaction)
		{
			const response = interaction.options.getString('input')
			await interaction.reply(response)
		}
};

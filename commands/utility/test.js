const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Start a game of hangman!')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Starts a game of hangman with the word')),
	async execute(interaction) {
		const input = interaction.options.getString('input')
		await interaction.reply({content: 'Game of hangman started!', ephemeral: true});
		if(input != null) {
        	await interaction.followUp(`${interaction.user.username} "Wrote ${input}" `);
        	console.log("input is: " + input);
			}
	},
};
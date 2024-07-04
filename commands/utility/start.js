const { SlashCommandBuilder } = require('discord.js');
const { errorHandling } = require('./hang_functions/errorhandling.js');

module.exports = {

	run: async ({interaction}) => {
		await interaction.reply("hrhrhhhrhr")
		console.log("when this trigger")
	},
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Start a game of hangman!')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Starts a game of hangman with the word')),
	async execute(interaction) {

		//If user did not provide input
		if(interaction.options.getString('input') == null){
			//Get a random word from a file mabye
			await interaction.reply(`${interaction.user.username} Started a game of hangman with a randomized word!`);
		}

		// If user provided input
		else {
			const input = interaction.options.getString('input')
			if(!errorHandling(input))
				await interaction.reply({content: 'ERROR: Could not start a game of Hangman. Your word has to be letters only.', ephemeral: true});
			else{
				await interaction.reply({content: 'Game of hangman started with the word: ' + input , ephemeral: true});
				if(input != null) {
        			await interaction.followUp(`${interaction.user.username} Started a game of hangman! `);
				}
			}
		}
	},
};

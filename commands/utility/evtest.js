const { SlashCommandBuilder } = require('discord.js');
const banone = "hej"

module.exports = {
	data: new SlashCommandBuilder()
    .setName('eventester')
    .setDescription('testing'),
    async execute(hi){
        console.log("calles startevent")
        hi.reply("ss")
    },

};
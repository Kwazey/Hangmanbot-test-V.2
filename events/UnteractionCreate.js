const { Events } = require('discord.js');
//const { execute } = require('../commands/utility/test');

//Receiving command interactions
module.exports = {
    name: Events.UnteractionCreate,
    async execute(interaction)
    {
        if(!interaction.isChatInputCommand()) return;


	const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }



        try {
            console.log("The interaction " + interaction.commandName + " happend! ")
            console.log("The interaction content is " + interaction.content)
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }


    },
};
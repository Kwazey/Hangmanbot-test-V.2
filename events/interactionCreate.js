const { Events } = require('discord.js');
let count = 0
//const { execute } = require('../commands/utility/test');

//Receiving command interactions
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction)
    {
        if(!interaction.isChatInputCommand()) return;


	const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        if (interaction.commandName == "start") {
            const input = interaction.options.getString('input')
            console.log("we can see that: " + input)
            count = count +1
            console.log("count is : " + count);
        }



        try {
            console.log("The interaction " + interaction.commandName + " happend! ")
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
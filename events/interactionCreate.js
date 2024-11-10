const { Events, Collection } = require('discord.js');
let count = 0


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
            //const input = interaction.options.getString('input')
            //console.log("we can see that: " + input)
            //count = count +1
            //console.log("count is : " + count);
        }

        const{ cooldowns } = interaction.client;

        if(!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if(now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1_000);
                setTimeout(() => interaction.deleteReply(), cooldownAmount + 5_000)
                return interaction.reply({ content : `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true});
            }
            
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        

       



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
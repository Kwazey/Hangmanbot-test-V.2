const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST().setToken(token);

var args = process.argv.slice(2);

//delete all commands in a guild
if( args[0] == "-a"){
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	    .then(() => console.log('Successfully deleted all guild commands.'))
	    .catch(console.error);
}


if (!args[0])
{
//Get the correct command ID from discord and copy it instead of the placeholder.'
rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'command ID'))
    .then(() => console.log('Successfully deleted guild command'))
    .catch(console.error);
}



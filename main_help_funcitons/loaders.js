const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

function load_commands (client, mainpath){

client.commands = new Collection();
// Code below loads the command files
const foldersPath = path.join(mainpath, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
    
};


function load_events (client, mainpath){

    const eventsPath = path.join(mainpath, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
            console.log(event.name)
        } else {
            client.on(event.name, (...args) => event.execute(...args));
            console.log(event.name)
        }
    }    

};

module.exports = {load_commands, load_events};

const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
//function {banana()} = require('./test.js');
const { testings } = require('./test.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.cooldowns = new Collection();




client.commands = new Collection();
// Code below loads the command files
const foldersPath = path.join(__dirname, 'commands');
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

const eventsPath = path.join(__dirname, 'events');
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

// Log in to Discord with your client's token
client.login(token);
Word_list = fs.readFileSync('Wordlist.txt', 'utf8').split("\r\n"); //use .split() to chose a character to define where a new piece of data starts
testings();
//console.log(client)


const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const {load_commands, load_events} = require('./main_help_funcitons/loaders.js');
const { testings } = require('./test.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.cooldowns = new Collection();

load_commands(client, __dirname)
load_events(client, __dirname)


// Log in to Discord with your client's token
client.login(token);
Word_list = fs.readFileSync('Wordlist.txt', 'utf8').split("\r\n"); //use .split() to chose a character to define where a new piece of data starts
testings();
//console.log(client)

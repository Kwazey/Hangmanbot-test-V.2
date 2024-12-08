const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

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

module.exports = {load_events};

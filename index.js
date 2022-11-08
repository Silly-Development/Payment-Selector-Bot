// Get packages and files
const config = require('./config.json');
const load_slash_commands = require('./deploy-commands.js')
const { Client, Collection, EmbedBuilder, ActionRowBuilder, Events, SelectMenuBuilder, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
// Client + Commands
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
// Billing Command

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

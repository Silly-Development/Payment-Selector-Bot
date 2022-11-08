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
    if (interaction.commandName === 'billing') {
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('billing')
					.setPlaceholder('Select Payment Method')
					.addOptions(
						{
							label: 'Payment 1',
							description: 'This is a description',
							value: 'payment_one',
						},
						{
							label: 'Payment 2',
							description: 'Payment 2',
							value: 'payment_two',
						},
                        {
							label: 'Payment 3',
							description: 'Payment 3',
							value: 'payment_three',
						},
                        {
							label: 'Payment 4',
							description: 'Payment 4',
							value: 'payment_four',
						},
                        {
							label: 'Payment 5',
							description: 'Payment 5',
							value: 'payment_five',
						},
					),
			);
        const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Select Payment Method')
			.setURL('https://client.sillydev.co.uk')
			.setDescription('Please Select Your Prefered Payment Method');

		await interaction.reply({ embeds: [embed], components: [row] });
	}
    const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isSelectMenu()) return;
    const payment1 = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Payment 1')
			.setURL('https://client.sillydev.co.uk')
			.setDescription('Payment 1');
        const payment2 = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Payment 2')
			.setURL('https://client.sillydev.co.uk')
			.setDescription('Payment 2');
        const payment3 = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Payment 3')
			.setURL('https://client.sillydev.co.uk')
			.setDescription('Payment 3');
        const payment4 = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Payment 4')
			.setURL('https://client.sillydev.co.uk')
			.setDescription('Payment 4');
        const payment5 = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Payment 5')
			.setURL('https://client.sillydev.co.uk')
			.setDescription('Payment 5');
    if (interaction.values.includes('payment_one'))  {
        await interaction.update({ embeds: [payment1], components: [] });
    }
    if (interaction.values.includes('payment_two'))  {
        await interaction.update({ embeds: [payment2], components: [] });
    }
    if (interaction.values.includes('payment_three'))  {
        await interaction.update({ embeds: [payment3], components: [] });
    }
    if (interaction.values.includes('payment_four'))  {
        await interaction.update({ embeds: [payment4], components: [] });
    }
    if (interaction.values.includes('payment_five'))  {
        await interaction.update({ embeds: [payment5], components: [] });
    }
});
// Set the bot's presence (activity and status)
client.on("ready", () => {
    client.user.setPresence({
        activities: [{ 
          name: "Payments", // this bit is broken, sorry
          type: "WATCHING" // this bit is broken, sorry
        }],
        status: "idle" // this bit works
    })
})
//Log The Bot In To Discord
client.login(config.token);

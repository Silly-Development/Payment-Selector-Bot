const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('billing') // slash command name
		.setDescription('Get Billing Info'), // slash command description
	async execute(interaction) {
		await interaction.reply(`This Command Is A PlaceHolder, This message can not be seen`);
	},
};

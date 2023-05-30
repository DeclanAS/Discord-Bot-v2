const { SlashCommandBuilder } = require('discord.js')
const help = '```Java\nList of commands:\n1. /join [Channel]\n2. /leave\n3. /help```'

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays list of commands.'),
		async execute(interaction) {
			await interaction.reply({ content: help, ephemeral:true })
	}
};
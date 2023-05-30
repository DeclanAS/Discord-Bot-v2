const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the music playing.'),
		async execute(interaction, player) {
			player.pause(interaction)
		}
};
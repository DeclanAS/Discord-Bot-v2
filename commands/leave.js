const { getVoiceConnection } = require('@discordjs/voice')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leaves the voice channel.'),
		async execute(interaction, player) {
			player.disconnect(interaction)
	}
};
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the music playing.'),
		async execute(interaction, player) {
			player.resume(interaction)
		}
};
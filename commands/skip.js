const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current song being played.'),
		async execute(interaction, player) {
			if(player.queue.length >= 2){
				player.skip(interaction)
			} else {
				await interaction.reply({content: 'Not enough songs to skip', ephemeral: true})
			}
		}
};
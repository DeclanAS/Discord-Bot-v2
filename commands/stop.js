const { SlashCommandBuilder } = require('discord.js')

module.exports = {

	data: new SlashCommandBuilder()

		.setName('stop')
		.setDescription('Stops the music playing & clears queue.'),

	async execute(interaction, player) {
		player.stop(interaction)
	}
};
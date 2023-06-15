const { SlashCommandBuilder } = require('discord.js')
const ytdl = require ('ytdl-core')

module.exports = {

	data: new SlashCommandBuilder()

		.setName('play')
		.setDescription('Plays requested music.')
		.addStringOption(option =>
			option
				.setName('query')
				.setDescription('A query or link.')
				.setRequired(true)
		),
		async execute(interaction, player) {
			let query = interaction.options.getString('query')
			// const args = interaction.options._hoistedOptions.map(option => option.value)

			if (ytdl.validateURL(query)){
				await player.playLink(interaction, query)
			} else {
				await player.playQuery(interaction, query)
			}
	}
};
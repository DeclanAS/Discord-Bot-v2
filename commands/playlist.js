const { SlashCommandBuilder } = require('discord.js')

module.exports = {

	data: new SlashCommandBuilder()

		.setName('playlist')
		.setDescription('Plays requested playlist.')
		.addStringOption(option =>
			option
				.setName('query')
				.setDescription('A playlist link')
				.setRequired(true)
		)
		.addIntegerOption(option => 
			option
				.setName('songs')
				.setDescription('The number of songs.')
				.setRequired(true)),
		async execute(interaction, player) {
			let query = interaction.options.getString('query')
			let num = interaction.options.getInteger('songs')

			player.playPlayList(interaction, query, num)
	}
};
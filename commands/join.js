const { SlashCommandBuilder, ChannelType } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Joins the voice channel.')
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('The channel it joins.')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildVoice)
			),
		async execute(interaction) {
			this.connection = joinVoiceChannel({
				adapterCreator: interaction.guild.voiceAdapterCreator,
				channelId: interaction.member.voice.channelId,
				guildId: interaction.guildId,
				selfDeaf: false
			})

			await interaction.reply({content: `User ${interaction.member.user.username}#${interaction.member.user.discriminator} invited the bot to join.`, ephemeral: true})

		}
};
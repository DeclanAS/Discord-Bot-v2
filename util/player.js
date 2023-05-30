const {
	generateDependencyReport,
	CreateAudioPlayerOptions,
	VoiceConnectionStatus,
	NoSubscriberBehavior,
	createAudioResource,
	AudioPlayerStatus,
	createAudioPlayer,
	joinVoiceChannel,
	entersState,
	StreamType
} = require('@discordjs/voice')

const {
	createMessageComponentCollector,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	update
} = require('discord.js')

const { decode } = require('html-entities')
const embedder = require('./embedder.js')
const config = require('../config.js')
const play = require('play-dl')

class player {

	constructor() {
		console.log(generateDependencyReport())
		let options = {
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Play
			}
		}

		this.nowPlayingActionRow = null
		this.nowPlayingMessage = null
		this.audioPlayer = null
		this.connection = null
		this.lockTrack = null
		this.resource = null
		this.queue = []
	}

	async connect(interaction) {
		this.connection = joinVoiceChannel({
			adapterCreator: interaction.guild.voiceAdapterCreator,
			channelId: interaction.member.voice.channelId,
			guildId: interaction.guildId,
			selfDeaf: false
		})

	}

	async disconnect(interaction) {
		if(this.connection)
			if (this.connection._state.status === 'destroyed'){
				await interaction.reply({ content: 'The bot has already left.', ephemeral:true })
			} else {
				this.connection.destroy()
				await interaction.reply({ content:`User ${interaction.member.user.username}#${interaction.member.user.discriminator} asked me to leave.`, ephemeral:true })
			}
		else
			await interaction.reply({ content: 'The bot never joined to begin with.', ephemeral:true })
	}

	async playNext(interaction) {

		// Create an audio resource using the ffmpeg stream.
		let stream = await play.stream(this.queue[0].url)

		this.resource = createAudioResource(stream.stream, {
			inputType: stream.type,
			inlineVolume: true
		})

		this.audioPlayer = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Play
			}
		})

		// If the connection is not 'Ready', attempt to enter that state.
		await this.stablizeConnection()

		// Plays the resouce.
		try {
			this.lockTrack = false
			this.audioPlayer.play(this.resource)
			await this.nowPlaying(this.queue[0], interaction)
			console.log(`Currently playing ${this.queue[0].title}`)

			// Subscribe the voice connection to the audioPlayer.
			this.connection.subscribe(this.audioPlayer)

		} catch (error) {
			console.log('//////////////// Play Next (Play) ////////////////')
			console.log(error)
			console.log('//////////////////////////////////////////////////')
		}

		console.log(`[================= Queue =================] [Size: ${this.queue.length}]`)
		console.log(this.queue)

		this.audioPlayer.on(AudioPlayerStatus.Buffering, () => { console.log('Buffering') })

		this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
			console.log('IDLE')
			if(!this.lockTrack){
				this.queue.shift()
				if(this.queue.length != 0)
					this.playNext(interaction)
			}
			this.lockTrack = true
		})

		this.audioPlayer.on(AudioPlayerStatus.AutoPaused, () => {
			console.log('AutoPaused')
		})

		this.audioPlayer.on(AudioPlayerStatus.Paused, () => {
			console.log('Paused')
		})

		this.audioPlayer.on('error', error => {
			console.log('//////////////// Play Next (Player) ////////////////')
			console.log(error)
			console.log('////////////////////////////////////////////////////')
			this.queue.shift()

			if(this.queue.length != 0)
				this.playNext(interaction)


		})

		this.audioPlayer.on('unsubscribe', () =>{
			console.log('unsubscribed')
		})

		this.connection.on('error', (error) =>{
			console.log(error)
		})

		return
	}

	async stablizeConnection() {
		if (this.connection.state.status !== VoiceConnectionStatus.Ready) {
			try {
				await entersState(this.connection, VoiceConnectionStatus.Ready, 5000)
			} catch (error) {
				console.log('//////////////// Stablize Connection ////////////////')
				console.log(error)
				console.log('/////////////////////////////////////////////////////')
			}
		}
	}

	async playLink(interaction, URL) {
		if (!interaction.member.voice.channelId){
			await interaction.reply({content: 'You\'re not in a voice channel.' , ephemeral: true})
			return
		}

		await this.connect(interaction)

		if((URL.startsWith('https') && play.yt_validate(URL) === 'video') ||
			(URL.startsWith('http') && play.yt_validate(URL) === 'video')){

			let result = await play.video_basic_info(URL)
			result = result.video_details

			let data = {
				             id: result.id,
				            url: result.url,
				          title: this.trimTitle(decode(result.title, {level: 'html5'})),
				       duration: result.durationInSec,
				      thumbnail: result.thumbnails[result.thumbnails.length - 1].url,
				      requestor: `${interaction.user.username}#${interaction.user.discriminator}`,
				    durationStr: result.durationRaw,
				   channelTitle: decode(result.channel.name, {level: 'html5'}),
				requestorAvatar: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp`
			}

			if (this.queue.length == 0){
				this.queue.push(data)
				this.playNext(interaction)
			} else {
				this.queue.push(data)
			}

			this.addTrack(data, interaction)

		} else {
			await interaction.reply({content: 'Not a valid Youtube url.!'})
		}

	}

	async playQuery(interaction, query) {
		if (!interaction.member.voice.channelId){
			await interaction.reply({content: 'You\'re not in a voice channel.' , ephemeral: true})
			return
		}

		await this.connect(interaction)

		let result = await play.search(query, {
			limit: 1
		})

		console.log(result[0])

		if (parseInt(result.length) > 0) {
			let data = {
				             id: result[0].id,
				            url: result[0].url,
				          title: this.trimTitle(decode(result[0].title, {level: 'html5'})),
				       duration: result[0].durationInSec,
				      thumbnail: result[0].thumbnails[0].url,
				      requestor: `${interaction.user.username}#${interaction.user.discriminator}`,
				    durationStr: result[0].durationRaw,
				   channelTitle: decode(result[0].channel.name, {level: 'html5'}),
				requestorAvatar: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp`
			}

			if (this.queue.length == 0){
				this.queue.push(data)
				this.playNext(interaction)
			} else {
				this.queue.push(data)
			}

			this.addTrack(data, interaction)

		} else {
			await interaction.reply({content: 'No results!'})
		}
	}

	addTrack(data, interaction) {
		let addTrack = new embedder()
		let pos = ''
		if (this.queue.length == 1)
			pos = 'Playing'
		else if (this.queue.length == 2)
			pos = 'Next'
		else
			pos = this.queue.length - 1
		addTrack = addTrack.addSong(
			data.title,
			data.url,
			data.channelTitle,
			data.thumbnail,
			data.requestor,
			data.requestorAvatar,
			pos.toString(),
			data.durationStr
		)

		interaction.reply({embeds: [addTrack]})
		return
	}

	async nowPlaying(data, interaction) {
		let nowPlaying = new embedder()
		nowPlaying = nowPlaying.nowPlaying(data.title, data.url)

		const filter = (interact) => {
			return interact.user.id
		}

		this.nowPlayingActionRow = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('pauseresume')
				.setLabel('Pause/Resume')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('favorite')
				.setLabel('Favorite')
				.setDisabled(true)
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('vold')
				.setLabel('Volume -')
				.setStyle(ButtonStyle.Danger),
			new ButtonBuilder()
				.setCustomId('volu')
				.setLabel('Volume +')
				.setStyle(ButtonStyle.Success)
		)

		this.nowPlayingMessage = await interaction.followUp({embeds: [nowPlaying], components: [this.nowPlayingActionRow]})

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: (this.queue[0].duration * 1000)})

		collector.on('collect', async (interact) => {
			switch(interact.customId){
				case 'pauseresume':
					if(this.audioPlayer.state.status === 'playing')
						this.pause(interaction)
					else if (this.audioPlayer.state.status === 'paused')
						this.resume(interaction)
					break
				case 'favorite':
					console.log('Favourite')
					console.log(collector._timeout)
					console.log(collector._timeout._idlePrev)
					console.log(collector._timeout._idleNext)
					break

				case 'vold':
					this.volumeDown(interaction)
					break

				case 'volu':
					this.volumeUp(interaction)
					break
			}
		})

		collector.on('end', async (interact) => {
			await this.nowPlayingMessage.edit({embeds: [nowPlaying], components: []})
		})

		return
	}

	async pause(interaction) {
		if (this.audioPlayer.pause())
			await interaction.followUp({ content: `User ${interaction.member.user.username}#${interaction.member.user.discriminator} paused.`, ephemeral: true })
		else
			await interaction.followUp({ content: `Failed to pause.`, ephemeral: true })
	}

	async resume(interaction) {
		if (this.audioPlayer.unpause())
			await interaction.followUp({ content: `User ${interaction.member.user.username}#${interaction.member.user.discriminator} resumed.`, ephemeral: true })
		else
			await interaction.followUp({ content: `Failed to resume.`, ephemeral: true })
	}

	async stop(interaction) {
		this.audioPlayer.stop()
		this.queue = []
		await interaction.reply({ content: 'You\'ve stopped the music.', ephemeral: true })
	}

	async volumeUp(interaction){
		if (this.resource.volume.volume !== 1.00) {
			this.resource.volume.setVolume(this.resource.volume.volume + 0.20)
			await interaction.followUp({ content: 'Volume increased 20%.', ephemeral: true })
		} else {
			await interaction.followUp({ content: 'Volume at max!', ephemeral: true })
		}
	}

	async volumeDown(interaction) {
		if (this.resource.volume.volume !== 0.00) {
			this.resource.volume.setVolume(this.resource.volume.volume - 0.20)
			await interaction.followUp({ content: 'Volume decreased 20%.', ephemeral: true })
		} else {
			await interaction.followUp({ content: 'Volume at min!', ephemeral: true })
		}
	}

	trimTitle(title) {
		if (title.length > 72)
			return title.substring(0, 70).concat('...')
		else
			return title
	}
	
}

module.exports = player
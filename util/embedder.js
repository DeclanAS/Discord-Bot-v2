const { EmbedBuilder } = require('discord.js')

// Not all of these are used. Carried over from v1.

class Embedder {

	constructor() {
		this.Message = new EmbedBuilder()
	}

	createLyrics(color, title, description, thumbnail, footer) {
		this.Message.setColor(color);
		this.Message.setTitle(title);
		this.Message.setDescription(description);
		if (thumbnail != '')
			this.Message.setThumbnail(thumbnail);
		this.Message.setFooter(footer);
		return this.Message;
	}

	createNotification(color, title, description, footer) {
		this.Message.setColor(color);
		this.Message.setTitle(title);
		this.Message.setDescription(description);
		this.Message.setFooter(footer);
		return this.Message;
	}

	addSong(title, url, author, thumbnail, user, icon, position, durationStr) {
		
		this.Message.setColor('#FFA500')
		this.Message.setAuthor({ name: 'Song Added', iconURL: 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32', url:'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32'})
		this.Message.setTitle('Track')
		this.Message.setDescription(`[${title}](${url})`)
		this.Message.setThumbnail(thumbnail)
		this.Message.addFields({name: 'Author', value: author, inline: true})
		this.Message.addFields({name: 'Queue position', value: position, inline: true})
		this.Message.addFields({name: 'Duration', value: durationStr, inline: true})
		this.Message.setFooter({text: `Requested by: ${user}`, iconURL: icon})

		return this.Message;
	}

	addPlayList(pos, songList, user, icon) {

		this.Message.setColor('#FFA500')
		this.Message.setAuthor('PlayList Added', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.setTitle('Songs added from the playlist:')
		this.Message.addFields({name: '#', value:pos.join(''), inline:true})
		this.Message.addFields({name: 'Songs', value:songList.join(''), inline:true})
		this.Message.setFooter(`Requested by: ${user}`, icon)

		return this.Message
	}

	playListContinued(pos, songList, user, icon) {

		this.Message.setColor('#FFA500')
		this.Message.setAuthor('PlayList Continued', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.setTitle('Songs added (continued):')
		this.Message.addFields({name: '#', value:pos.join(''), inline:true})
		this.Message.addFields({name: 'Songs', value:songList.join(''), inline:true})
		this.Message.setFooter(`Requested by: ${user}`, icon)	

		return this.Message
	}

	nowPlaying(title, url) {

		this.Message.setColor('#00FF00')
		this.Message.setAuthor({ name: 'Now Playing', iconURL: 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32', url:'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32'})
		this.Message.setDescription(`[${title}](${url})`)

		return this.Message;
	}

	showQueue(pos, title, author) {

		this.Message.setColor('#FFA500')
		this.Message.setAuthor('Song Queue:', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.addFields({name: '#', value:pos.join(''), inline:true})
		this.Message.addFields({name: 'Title', value:title.join(''), inline:true})
		this.Message.addFields({name: 'Author', value:author.join(''), inline:true})

		return this.Message
	}

	showQueueContinued(pos, title, author) {

		this.Message.setColor('#FFA500')
		this.Message.setAuthor('Song Queue (Continued):', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.addFields({name: '#', value:pos.join(''), inline:true})
		this.Message.addFields({name: 'Title', value:title.join(''), inline:true})
		this.Message.addFields({name: 'Author', value:author.join(''), inline:true})

		return this.Message

	}

	noResults(query) {

		this.Message.setColor('#FF0000')
		this.Message.setAuthor('No Results!', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.setDescription(`No Results for **${query}**`)

		return this.Message
	}

	playLinkError() {

		this.Message.setColor('#FF0000')
		this.Message.setAuthor('An error occurred when retrieving this song.', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.setDescription('Likely causes:\n1. Age-restricted video.\n2. Region-locked video.\n3. Non-public video.\n4. Copyright claimed video.')

		return this.Message
	}

	emptyQueue() {

		this.Message.setColor('#FFC0CB')
		this.Message.setAuthor('The queue is empty...', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.setDescription('To add songs, use:\`\`\`[prefix] play [playlist/link/query]\`\`\`')

		return this.Message
	}

	badInput() {

		this.Message.setColor('#FF0000')
		this.Message.setAuthor('Bad argument(s)', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.setDescription('Ensure you use the correct syntax.' )

		return this.Message

	}

	fewToRemove () {

		this.Message.setColor('#FF0000')
		this.Message.setAuthor('Too Few To Remove', 'https://cdn.discordapp.com/app-icons/666850465832632341/16c56463dad3aa012570a08b46c1b6e5.png?size=32')
		this.Message.setDescription('There needs to be greater than 1 song in the queue.' )

		return this.Message
		
	}

}


module.exports = Embedder
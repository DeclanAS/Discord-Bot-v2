
/* Node Imports */
const fs = require('node:fs');
const path = require('node:path');

const player = require('./util/player.js')
const config = require('./config.js')
const deploy = require('./deploy-scommands.js')
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');

/* Discord Bot Initialization */
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates]})

let music = new player()
client.commands = new Collection()
const cmdPath = path.join('C:\\Users\\Declan\\Desktop\\Discord Bot', 'commands')
const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'))

const commands = []
for (let file of cmdFiles) {
	let filePath = path.join(cmdPath, file)
	let command = require(filePath)
	client.commands.set(command.data.name, command)
	commands.push(command.data.toJSON())
}

client.once(Events.ClientReady, () => {
	console.log(`Logged in as ${client.user.tag}`)
	deploy.deploy(commands)
})

client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isChatInputCommand()) return

	console.log(`Chat Command: \'${interaction.commandName}\'`)
	let command = interaction.client.commands.get(interaction.commandName)

	if(!command) return

	if(interaction.isButton()){
		console.log(interaction)
	}

	try {
		switch(interaction.commandName) {
			case 'play':
			case 'skip':
			case 'leave':
			case 'pause':
			case 'resume':
			case 'playlist':
				await command.execute(interaction, music)
				break
			case 'join':
			case 'help':
				await command.execute(interaction)
				break
		}
	} catch (error) {
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		console.log(error)
	}

})

client.login(config.Token)

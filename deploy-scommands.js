const {REST, Routes} = require('discord.js')
const config = require('./config.js')

exports.deploy = async function (cmds) {
	const rest = new REST({version: '10'}).setToken(config.Token)
		try {
			console.log(`Started refreshing ${cmds.length} application (/) commands.`)

			const data = await rest.put(
				Routes.applicationGuildCommands(config.clientId, config.guildId),
				{ body: cmds }
			)

		console.log(`Successfully reloaded ${data.length} application (/) commands.`)
	} catch (error) {
		console.log(error)
	}
}

require('dotenv').config()
const { Client } = require('discord.js')
const ytdl = require('ytdl-core')
const PREFIX = '?'

const client = new Client({ disableEveryone: true })

client.on('ready', () => console.log('ready'))

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return

    const args = message.content.substring(PREFIX.length).split(" ")
    if (message.content.startsWith(PREFIX + 'play')) {
        const voiceChannel = message.member.voiceChannel
        if (!voiceChannel) {
            return message.channel.send("You need to be in a voice channel to be in this bot")
        }
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has("CONNECT")) return message.channel.send("I don\'t have permissions to this voice channel");
    }
})

client.login(process.env.TOKEN)
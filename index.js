require('dotenv').config()
const { Client } = require('discord.js')
const ytdl = require('ytdl-core')
const PREFIX = '?'

const client = new Client({ disableEveryone: true })

client.on('ready', () => console.log('ready'))

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.substring(PREFIX.length).split(" ")
    if (message.content.startsWith(PREFIX + 'play')) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("You need to be in a voice channel to use this bot")
        }
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has("CONNECT")) return message.channel.send("I don\'t have permissions to this voice channel");
        if (!permissions.has("SPEAK")) return message.channel.send("I don\'t have voice access to the channel")

        try {
            var connection = await voiceChannel.join()
        } catch (err) {
            console.log(`There was an error: ` + err)
            return message.channel.send(`There was an error: ` + err)
        }

        const dispatcher = connection.play(ytdl(args[1]))
            .on('finish', () => {
                voiceChannel.leave()
            })
            .on('error', err => {
                console.log(err)
            })

        dispatcher.setVolumeLogarithmic(1 / 8)

    } else if (message.content.startsWith(PREFIX + 'stop')) {
        if (!message.member.voice.channel) return message.channel.send('You need to be in the voice channel to stop the music')
        message.member.voice.channel.leave()
        return message.channel.send('Stopping Music... See you soon')
    }
})

client.login(process.env.TOKEN)
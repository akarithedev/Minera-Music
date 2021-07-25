const djs = require('discord.js')
const botconfig = require("../../botconfig.json")
module.exports = {
    name: "play",
    aliases: ["add", "p"],
    usage: "play <song url if one> <search term if one>",
    description: "Play a song to chill your heart :>",
    category: "music",
    run: async(bot, msg, args) => {
        let voiceChannel = msg.member.voice.channel;
        let embed = new djs.MessageEmbed()

        if(!voiceChannel) {
            embed.setDescription(`:x: You must be in a voice channel in order to use this command.`)
            embed.setColor("RED")
            embed.setFooter(`Requested by ${msg.author.tag}`)
            return msg.channel.send(embed)
        }

        const permissions = voiceChannel.permissionsFor(bot.user);

        if(!permissions.has("CONNECT")) {
            embed.setDescription(`:x: I don't have permission to join your channel!`)
            embed.setColor("RED")
            embed.setFooter(`Requested by ${msg.author.tag}`)
            return msg.channel.send(embed)
        }
        if(!permissions.has("SPEAK")) {
            embed.setDescription(`:x: I don't have permission to speak in your channel!`)
            embed.setColor("RED")
            embed.setFooter(`Requested by ${msg.author.tag}`)
            return msg.channel.send(embed)
        }
        let songs;
        try {
            songs = args.join(" ")

             if(!songs) {
                embed.setDescription(`:x: Please provide a song name or url to play!`)
                embed.setColor("RED")
                embed.setFooter(`Requested by ${msg.author.tag}`)
                return msg.channel.send(embed)
            };

            const player = bot.manager.create({
                guild: msg.guild.id,
                voiceChannel: msg.member.voice.channel.id,
                textChannel: msg.channel.id,
                volume: 70,
                selfDeafen: true
            });
            let res = await bot.manager.search(songs, msg.author);
            if(player.voiceChannel !== voiceChannel.id) {
                embed.setDescription(`:x: I'm used in other voice channel!`)
                embed.setColor("RED")
                embed.setFooter(`Requested by ${msg.author.tag}`)
                return msg.channel.send(embed)
            };

            if(player.state !== 'CONNECTED') player.connect();

            if(res.loadType === "NO_MATCHES") {
                if (!player.queue.current) player.destroy();
                embed.setDescription(`:x: Could not find any result for that song!`)
                embed.setColor("RED")
                embed.setFooter(`Requested by ${msg.author.tag}`)
                return msg.channel.send(embed)
            } else if(res.loadType === "PLAYLIST_LOADED") {
                player.queue.add(res.tracks);
                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                embed.setDescription(`:white_check_mark: Loaded playlist ${res.playlist.name}`)
                embed.setColor("BLUE")
                embed.setFooter(`Queued by ${msg.author.tag}`)
                return msg.channel.send(embed)
            } else if(res.loadType === "SEARCH_RESULT") {
                player.queue.add(res.tracks[0])
            if(player.queue.length !== 0) {
                embed.setDescription(`🔎 Searching for \`${songs}\`...`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${msg.author.tag}`)
                let idk = await msg.channel.send(embed)

                setTimeout(() => {
                embed.setDescription(`:white_check_mark: Added **${res.tracks[0].title}** to the queue`)
                embed.setFooter(`Queued by ${msg.author.tag}`)
                embed.setThumbnail(res.tracks[0].thumbnail)
                embed.setColor("BLUE")
                return idk.edit(embed)
                }, 3000)
            }
            if (!player.playing && !player.paused && !player.queue.size) player.play();
        }
        } catch(e) {
            embed.setDescription("An error occured while playing this track/playlist")
            embed.setColor("RED")
            return msg.channel.send(embed)
        }
    }
}
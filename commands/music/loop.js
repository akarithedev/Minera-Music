const djs = require("discord.js")

module.exports = {
    name: "loop",
    category: "music",
    description: "Repeats the current song or the whole queue if exist",
    aliases: ["repeat", "loopsong", "loopqueue"],
    run: async(bot, msg, args) => {
        let voiceChannel = msg.member.voice.channel;
        let player = bot.manager.get(msg.guild.id);
        let embed = new djs.MessageEmbed()

        if(!voiceChannel) {
            embed.setDescription(":x: You need to be in a voice channel to enable or disable repeat mode!")
            embed.setColor("RED")
            embed.setFooter(`Requested by ${msg.author.tag}`)
            return msg.channel.send(embed)
           }
             if(!player) {
                 embed.setDescription(":x: No song(s) playing in this guild.")
                 embed.setColor("RED")
                 embed.setFooter(`Requested by ${msg.author.tag}`)
                 return msg.channel.send(embed)
             }
             if(player.voiceChannel !== voiceChannel.id) {
               embed.setDescription(`:x: You need to be in the right channel to enable or disable repeat mode!`)
               embed.setColor('RED')
               embed.setFooter(`Requested by ${msg.author.tag}`)
               return msg.channel.send(embed)
              }

              if(player.setQueueRepeat(!player.queueRepeat)) {
              embed.setDescription(`🔁 ${player.queueRepeat ? "Enabled" : "Disabled"} repeat mode`)
              embed.setFooter(`Requested by ${msg.author.tag}`)
              embed.setColor("BLUE")
              return msg.channel.send(embed)
              
              }
    }
}
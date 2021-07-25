const djs = require("discord.js")

module.exports = {
    name: "pause",
    category: "music",
    description: "Pause the song",
    run: async(bot, msg, args) => {
   let player = bot.manager.get(msg.guild.id)
   let voiceChannel = msg.member.voice.channel;
   let embed = new djs.MessageEmbed()
   if(!voiceChannel) {
    embed.setDescription(":x: You need to be in a voice channel to pause the song!")
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
       embed.setDescription(`:x: You need to be in the right channel to pause the song!`)
       embed.setColor('RED')
       embed.setFooter(`Requested by ${msg.author.tag}`)
       return msg.channel.send(embed)
      }
      if(player.paused) {
          embed.setDescription(":x: The song is already paused.")
          embed.setColor("RED")
          embed.setFooter(`Requested by ${msg.author.tag}`)
          return msg.channel.send(embed)
      }

    player.pause(true);
    embed.setDescription("⏸ Paused the song")
    embed.setColor("BLUE")
    embed.setFooter(`Paused by ${msg.author.tag}`)
    return msg.channel.send(embed)
    }
}
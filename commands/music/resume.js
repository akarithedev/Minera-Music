const djs = require("discord.js")

module.exports = {
    name: "resume",
    category: "music",
    description: "Resumes the paused song",
    run: async(bot, msg, args) => {
   let player = bot.manager.get(msg.guild.id)
   let voiceChannel = msg.member.voice.channel;
   let embed = new djs.MessageEmbed()
   if(!voiceChannel) {
    embed.setDescription(":x: You need to be in a voice channel to resume the song!")
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
       embed.setDescription(`:x: You need to be in the right channel to resume the song!`)
       embed.setColor('RED')
       embed.setFooter(`Requested by ${msg.author.tag}`)
       return msg.channel.send(embed)
      }
      if(!player.paused) {
          embed.setDescription(":x: The song is not paused.")
          embed.setColor("RED")
          embed.setFooter(`Requested by ${msg.author.tag}`)
          return msg.channel.send(embed)
      }

    player.pause(false);
    embed.setDescription("▶ Resumed the song")
    embed.setColor("BLUE")
    embed.setFooter(`Resumed by ${msg.author.tag}`)
    return msg.channel.send(embed)
    }
}
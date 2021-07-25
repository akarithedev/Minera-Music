const djs = require("discord.js")

module.exports = {
    name: "volume",
    category: "music",
    description: "Change the volume of the song",
    usage: "volume <value>",
    run: async(bot, msg, args) => {
   let player = bot.manager.get(msg.guild.id)
   let voiceChannel = msg.member.voice.channel;
   let value = args[0];
   let embed = new djs.MessageEmbed()
   if(!voiceChannel) {
    embed.setDescription(":x: You need to be in a voice channel to change the volume of the song!")
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
       embed.setDescription(`:x: You need to be in the right channel to change the volume of the song!`)
       embed.setColor('RED')
       embed.setFooter(`Requested by ${msg.author.tag}`)
       return msg.channel.send(embed)
      }

      if(!value) {
          embed.setDescription(`The current volume of the player is **${player.volume}**%`)
          embed.setColor("BLUE")
          embed.setFooter(bot.copyright)
          return msg.channel.send(embed)
      }
      if(isNaN(value)) {
          embed.setDescription(":x: The given value should be a number!")
          embed.setColor("RED")
          embed.setFooter(bot.copyright)
          return msg.channel.send(embed)
      }
        if(value > 100) {
            embed.setDescription(":x: What? you wanna destroy your ears? well you can only from 0 to 100")
            embed.setColor("RED")
            embed.setFooter(bot.copyright)
            return msg.channel.send(embed)
        }
      player.setVolume(value)
      embed.setDescription(`:white_check_mark: Successfully set the volume to **${value}**%`)
      embed.setColor("BLUE")
      embed.setFooter(bot.copyright)
      return msg.channel.send(embed)
    }
}
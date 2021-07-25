const djs = require("discord.js")

module.exports = {
    name: "skip",
    aliases: ["s", "next", "forceskip"],
    category: "music",
    description: "Resumes the paused song",
    run: async(bot, msg, args) => {
   let player = bot.manager.get(msg.guild.id)
   let voiceChannel = msg.member.voice.channel;
   let embed = new djs.MessageEmbed()
   if(!voiceChannel) {
    embed.setDescription(":x: You need to be in a voice channel to skip the song!")
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
       embed.setDescription(`:x: You need to be in the right channel to skip the song!`)
       embed.setColor('RED')
       embed.setFooter(`Requested by ${msg.author.tag}`)
       return msg.channel.send(embed)
      }

      player.stop();
      embed.setDescription(`⏭ Skipping **${player.queue.current.title}**`)
      embed.setColor("BLUE")
      embed.setFooter(`Skipped by ${msg.author.tag}`)
      return msg.channel.send(embed)
    }
}
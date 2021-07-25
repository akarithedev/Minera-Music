const djs = require('discord.js')

module.exports = { 
    name: "stop", 
    category: "music", 
    aliases: ["leave"],
    description: "Stop the music and take a rest",
    run: async (bot, msg, args) => { 
   
   let player = bot.manager.get(msg.guild.id)
   let voiceChannel = msg.member.voice.channel;
   let embed = new djs.MessageEmbed()
   if(!voiceChannel) {
    embed.setDescription(":x: You need to be in a voice channel to stop the music!")
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
       embed.setDescription(`:x: You need to be in the right channel to stop the music!`)
       embed.setColor('RED')
       embed.setFooter(`Requested by ${msg.author.tag}`)
       return msg.channel.send(embed)
      }
     player.destroy(msg.guild.id);
     embed.setDescription("⏹ Stopped the music.")
     embed.setColor("RED")
     embed.setFooter(`Requested by ${msg.author.tag}`)
     return msg.channel.send(embed)
     
   
   
    }
   }
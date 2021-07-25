const djs = require("discord.js")
const ms = require("parse-ms")
module.exports = {
    name: "nowplaying",
    description: "Shows the current playing song info",
    category: "music",
    aliases: ["np", "current"],
    run: async(bot, msg, args) => {
let voiceChannel = msg.member.voice.channel;
let player = bot.manager.get(msg.guild.id);

let embed = new djs.MessageEmbed()
    if(!voiceChannel) {
        embed.setDescription(":x: You need to be in a voice channel!")
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
           embed.setDescription(`:x: You need to be in the right channel as me!`)
           embed.setColor('RED')
           embed.setFooter(`Requested by ${msg.author.tag}`)
           return msg.channel.send(embed)
          }
          let songDuration = ms(player.queue.current.duration);
let songTime = player.queue.current.duration;
let position = ms(player.position)
let completed = player.position
    let barlength = 30;
    let completedpercent = ((completed / songTime) * barlength).toFixed(0);
    let array = [];
    for (let i = 0; i < completedpercent - 1; i++) {
      array.push("⎯");
    }
    array.push("🔘");
    for (let i = 0; i < barlength - completedpercent - 1; i++) {
      array.push("⎯");
    }

          embed.setColor("BLUE")
          embed.setFooter(`Requested by ${msg.author.tag}`)
          embed.setDescription([
              `**Song Title**: \`${player.queue.current.title}\``,
              `**Song URL**: [Click Here](${player.queue.current.uri})`,
              `**Song Duration & Position**: ${player.isStream ? "`🔘 Live`" : `\`${position.hours}:${position.minutes}:${position.seconds} / ${songDuration.hours}:${songDuration.minutes}:${songDuration.seconds}\``}`,
              `**Progress Bar**: \`${array.join("")}\``,
              `**Song Author**: \`${player.queue.current.author}\``,
              `**Song Requester**: \`${player.queue.current.requester.tag}\``,
              `**Voice Channel**: \`${bot.channels.cache.get(player.voiceChannel).name}\``,
              `**Text Channel**: \`📝 ${bot.channels.cache.get(player.textChannel).name}\``
          ])
          msg.channel.send(embed)

    }
}
const djs = require("discord.js")

module.exports = {
    name: "tremolo",
    description: "Enables or disables the tremolo filter",
    usage: "tremolo on/of",
    aliases: ["trem"],
    category: "filters",
    run: async(bot, msg, args) => {
        let embed = new djs.MessageEmbed()
        let voiceChannel = msg.member.voice.channel;
        let player = bot.manager.get(msg.guild.id);
        if(!voiceChannel) {
            embed.setDescription(":x: You need to be in a voice channel to enable or disable the tremolo filter!")
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
             if(!args[0]) {
                 embed.setDescription(":x: Please provide an option in order to enable or disable the tremolo filter `on/off`.")
                 embed.setColor("RED")
                 embed.setFooter(`Requested by ${msg.author.tag}`)
                 return msg.channel.send(embed)
             }

             if(player.voiceChannel !== voiceChannel.id) {
               embed.setDescription(`:x: You need to be in the right channel to enable or disable tremolo filter!`)
               embed.setColor('RED')
               embed.setFooter(`Requested by ${msg.author.tag}`)
               return msg.channel.send(embed)
              }

              if(args[0] === "on") {
              embed.setDescription("Applying tremolo filter...")
              embed.setColor("BLUE")
              embed.setFooter(`Requested by ${msg.author.tag}`)
              let mes = await msg.channel.send(embed)

              setTimeout(() => {

              if(player.node.send({
                  "op": "filters",
                  "guildId": msg.guild.id,
                  "tremolo": {
                    "depth": 0.75,
                    "frequency": 2
                  }
              })) {
                embed.setDescription(":white_check_mark: Successfully applied tremolo filter!")
                embed.setColor("GREEN")
                embed.setFooter(`Requested by ${msg.author.tag}`)
                return mes.edit(embed)
              }
            }, 5000)
            } else if(args[0] === "off") {
                embed.setDescription("Disabling tremolo filter...")
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${msg.author.tag}`)
                let mes = await msg.channel.send(embed)
  
                setTimeout(() => {
                if(player.node.send({
                  "op": "filters",
                  "guildId": msg.guild.id,
                  "tremolo": {
                    "depth": .5,
                    "frequency": 2
                  }
              })) {
                  embed.setDescription(":white_check_mark: Successfully disabled tremolo filter!")
                  embed.setColor("GREEN")
                  embed.setFooter(`Requested by ${msg.author.tag}`)
                  return mes.edit(embed)
                }
              }, 5000)

            } else {
                embed.setDescription(":x: Please provide a valid option!")
                embed.setColor("RED")
                embed.setFooter(`Requested by ${msg.author.tag}`)
                return msg.channel.send(embed)
            }
    }
}
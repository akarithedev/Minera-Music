const djs = require("discord.js")

module.exports = {
    name: "queue",
    description: "Shows the queue",
    aliases: ["q"],
    category: "music",
    run: async(bot, msg, args) => {
        let voiceChannel = msg.member.voice.channel;
        let player = bot.manager.get(msg.guild.id)
        let embed = new djs.MessageEmbed()

        if(!voiceChannel) {
            embed.setDescription(":x: You need to be in a voice channel to use this command!")
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
               embed.setDescription(`:x: You need to be in the right channel to use this command!`)
               embed.setColor('RED')
               embed.setFooter(`Requested by ${msg.author.tag}`)
               return msg.channel.send(embed)
              }

              const queue = player.queue.map((t, i) => `> \`${++i}.\` **${t.title}**`);
              const chunked = bot.utils.chunk(queue, 10).map(x => x.join("\n"));
                embed.setDescription([
                    `**Now Playing**`,
                    `> ${player.queue.current ? player.queue.current.title : "No song"}`,
                    ``,
                    `**Queue List**`,
                    `${chunked[0] ? chunked[0] : "> No song(s) found in queue list"}`
                ])
                embed.setColor("BLUE")
                embed.setFooter(`Page 1 of ${chunked.length}.`);
                embed.setColor("BLUE")
              try {
                  const queueMsg = await msg.channel.send(embed);
                  if (chunked.length > 1) await bot.utils.pagination(queueMsg, msg.author, chunked);
              } catch (e) {
                  msg.channel.send(`An error occured: ${e.message}.`);
              }

    }
}
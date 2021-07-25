const djs = require("discord.js")
const Guild = require("../../schemas/Guild.js")
const mongoose = require("mongoose")
const botconfig = require("../../botconfig.json")
module.exports = {
    name: "setprefix",
    aliases: ["prefix"],
    usage: "setprefix <new prefix>",
    description: "Sets the prefix to a new one",
    category: "config",
    run: async(bot, msg, args) => {
        let embed = new djs.MessageEmbed()

        if(!msg.member.hasPermission("MANAGE_GUILD")) {
            embed.setDescription(":x: You don't have the required permissions to change the guild prefix.")
            embed.setColor("RED")
            embed.setFooter(bot.copyright)
            return msg.chnanel.send(embed)
        }

        const settings = await Guild.findOne({
            guildID: msg.guild.id
        }, (err, guild) => {
            if(err) console.error(err)
            if(!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectID(),
                    guildID: msg.guild.id,
                    guildName: msg.guild.name,
                    prefix: botconfig.prefix
                })
                newGuild.save().then(result => console.log(result)).catch(error => console.error(error));
                embed.setDescription(":x: This server wasn't in the database, adding the server to database")
                embed.setColor("RED")
                embed.setFooter(bot.copyright)
                return msg.channel.send(embed)
            }
        })

        if(!args[0]) {
            embed.setDescription(`My prefix for \`${msg.guild.name}\` is **${settings.prefix}**`)
            embed.setColor("BLUE")
            embed.setFooter(bot.copyright)
            return msg.channel.send(embed)
        }

        await settings.updateOne({
            prefix: args[0]
        });

        embed.setDescription(`:white_check_mark: Successfully set the prefix to **${args[0]}**`)
        embed.setColor("GREEN")
        embed.setFooter(bot.copyright)
        return msg.channel.send(embed)
    }
}
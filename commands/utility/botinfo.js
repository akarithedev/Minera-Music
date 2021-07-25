const djs = require("discord.js")
const { version } = require("../../package.json")
const Guild = require("../../schemas/Guild.js")
const ms = require("parse-ms")
const botconfig = require("../../botconfig.json")
const mongoose = require("mongoose")
module.exports = {
    name: "botinfo",
    description: "Shows my info",
    category: "utility",
    aliases: ["stats"],
    run: async(bot, msg, args) => {
        let embed = new djs.MessageEmbed()
        let uptime = ms(bot.uptime)
        let settings = await Guild.findOne({guildID: msg.guild.id})

        embed.setAuthor("General Information")
        embed.setDescription([
            `**Bot Version**: ${version}`,
            `**Discord.Js Version**: ${djs.version}`,
            `**Node.Js version**: ${process.version}`,
            `**Guild(s) Length**: ${bot.guilds.cache.size}`,
            `**User(s) Length**: ${bot.users.cache.size}`,
            `**Channel(s) Length**: ${bot.channels.cache.size}`,
            `**Uptime**: ${uptime.days} Day(s) | ${uptime.hours} Hour(s) | ${uptime.minutes} Minute(s) | ${uptime.seconds} Second(s)`,
            `**Default Prefix**: ${botconfig.prefix}`,
            `**Guild Prefix**: ${settings.prefix}`,
            `**Memory**:`,
            `> **RSS**: ${bot.utils.formatBytes(process.memoryUsage().rss)}`,
            `> **Used**: ${bot.utils.formatBytes(process.memoryUsage().heapUsed)}`,
            `> **Total**: ${bot.utils.formatBytes(process.memoryUsage().heapTotal)}`
        ])
        embed.setColor("BLUE")
        embed.setFooter(bot.copyright)
        embed.setThumbnail(bot.user.displayAvatarURL({format: 'png', size: 2048}))
       return msg.channel.send(embed)
    }
}
const djs = require('discord.js')
const botconfig = require("../../botconfig.json")
module.exports = {
    name: "help",
    aliases: ["commands", "h"],
    usage: "help [command if one]",
    description: "Shows a list of my commands or get help about a command",
    category: "utility",
    run: async(bot, msg, args) => {
        let command = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]))

        if(args[0]) {
            if(!command) {
                return msg.channel.send(`Not a valid command or alias called ${args[0]}`)
            }
            let embed = new djs.MessageEmbed()
            embed.setAuthor(`${bot.user.username} Help`)
            embed.setDescription([
                `> **Command**: \`${bot.utils.capitalise(command.name)}\``,
                `> **Aliases**: \`${command.aliases ? command.aliases.map(alias => alias).join(", ") : "No aliases found"}\``,
                `> **Usage**: \`${command.usage ? command.usage : "No usage found"}\``,
                `> **Description**: \`${command.description}\``,
                `> **Category**: \`${command.category}\``
            ])
            embed.setFooter(`${bot.copyright} | Total commands: ${bot.commands.size}`)
            embed.setColor("BLUE")
            embed.setThumbnail(bot.user.displayAvatarURL({format: 'png', size: 2048}))
            return msg.channel.send(embed)
        } else {
            let emx = new djs.MessageEmbed()
            .setFooter(`${bot.copyright} | Total commands: ${bot.commands.size}`)
            .setColor("BLUE")
            .setThumbnail(bot.user.displayAvatarURL({format: 'png', size: 2048}))
            .setAuthor(`${bot.user.username} Help`)
            let categories = bot.utils.removeDuplicates(bot.commands.map(cmd => cmd.category));

                for (const category of categories) {
                    emx.addField(`${bot.utils.capitalise(category)}`, bot.commands.filter(cmd =>
                        cmd.category === category).map(cmd => `\`${cmd.name}\``).join(', '))
                }
                return msg.channel.send(emx)
        }
    }
}
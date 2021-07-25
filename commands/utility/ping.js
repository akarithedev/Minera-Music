const djs = require("discord.js")

module.exports = {
    name: "ping",
    description: "Show the bot latency",
    category: "utility",
    aliases: ["latency"],
    run: async(bot, msg, args) => {
        let message = await msg.channel.send("Pong.");
        let ping = message.createdTimestamp - msg.createdTimestamp;

        let embed = new djs.MessageEmbed()
        .setDescription(`Latency is \`${ping}ms\`, WebSocket is \`${bot.ws.ping}ms\``)
        .setColor("BLUE")
        .setFooter(`Requested by ${msg.author.tag} | ${bot.copyright}`)
        message.edit("", embed)
    }
}
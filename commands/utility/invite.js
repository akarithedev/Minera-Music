const djs = require("discord.js")

module.exports = {
    name: "invite",
    description: "Get the invite link",
    category: "utility",
    run: async(bot, msg, args) => {
        let embed = new djs.MessageEmbed()
        .setDescription("Do you want to invite me into your server? well here is the link: [Invite Me](https://discord.com/api/oauth2/authorize?client_id=841745198971486208&permissions=36700160&scope=bot)")
        .setColor("BLUE")
        .setFooter(bot.copyright)
        msg.channel.send(embed)
    }
}
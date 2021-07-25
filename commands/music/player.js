const djs = require("discord.js")
module.exports = {
    name: "player",
    aliases: ["playerstats"],
    category: "music",
    description: "Shows the info of the andesite node that is used",
    run: async(bot, msg, args) => {
        let nodes = [...bot.manager.nodes.values()]

        function duration(ms) {
			const sec = Math.floor((ms / 1000) % 60).toString()
			const min = Math.floor((ms / (1000 * 60)) % 60).toString()
			const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
			const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
			return `${days.padStart(1, '0')} Day(s), ${hrs.padStart(2, '0')} Hour(s), ${min.padStart(2, '0')} Minute(s), ${sec.padStart(2, '0')} Second(s)`
		}
        let embed = new djs.MessageEmbed()
            .setAuthor(`Andesite Player Stats`)
            .setDescription(
                nodes.map(node  => {
                    const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
                    const memUsage = bot.utils.formatBytes(node.stats.memory.used);
                    const uptime = duration(node.stats.uptime);

                    return `\`\`\`asciidoc
Client :: ${node.options.clientName}
Identifier :: ${node.options.identifier}
State :: ${node.connected ? "Connected" : "Disconnected"}
${node.connected ? `
Andesite Load :: ${cpuLoad}%
Memory Usage :: ${memUsage}
Uptime :: ${uptime}
Players :: ${node.stats.playingPlayers} of ${node.stats.players} playing` : ""}\`\`\``;
                })
            )
            .setTimestamp()
            msg.channel.send(embed)
    }
}
const djs = require("discord.js")
const { inspect } = require('util')
const Guild = require("../../schemas/Guild.js")
module.exports = {
    name: "eval",
    description: "Evaluates the given arguments",
    usage: "eval <input>",
    category: "developer",
    run: async(bot, msg, args) => {
        if(!bot.owners.includes(msg.author.id)) {
let embed = new djs.MessageEmbed()
.setDescription(":x: This command is available only for my master.")
.setColor("RED")
.setFooter(bot.copyright)
return msg.channel.send(embed)
        }

  try {
    var result = args.join(" ");
    let player = bot.manager.get(msg.guild.id) || "None";
    const server = await Guild.findOne({guildID: msg.guild.id})
    
    if(result.includes("token") || result.includes(bot.token)) {
      return msg.channel.send("Nope")
    }
    let noResultArg = new djs.MessageEmbed()
    .setColor("#e31212")
    .setDescription(":x: No valid arguments were provided")
    .setFooter(bot.copyright)
    if (!result) return msg.channel.send(noResultArg)
    let toEval = eval(result);
    let evaled = inspect(toEval)
    msg.channel.send('```js\n' + evaled + '```')
    
  } catch (error) {
    let resultError = new djs.MessageEmbed()
    .setColor("#e31212")
    .addField(`ERROR:\n`, '```js\n' + `${error.message}` + '```', true)
    .setFooter(bot.copyright)
    return msg.channel.send(resultError)
  }
    }
}
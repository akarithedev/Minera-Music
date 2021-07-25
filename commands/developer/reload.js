const djs = require('discord.js')

module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  category: 'developer',
  usage: 'reload <command>',
  run: async(bot, msg, args) => {
     if(!bot.owners.includes(msg.author.id)) {
let embed = new djs.MessageEmbed()
.setDescription(":x: This command is available only for my master.")
.setColor("RED")
.setFooter(bot.copyright)
return msg.channel.send(embed)
        }
    if(!args[0]) {
        let embed = new djs.MessageEmbed()
        .setDescription(":x: Please provide a command to reload.")
        .setColor("RED")
        .setFooter(bot.copyright)
        return msg.channel.send(embed)
    }

    let commandName = args[0].toLowerCase();
    let cmd = bot.commands.get(commandName)

  try { 
     delete require.cache[require.resolve(`../../commands/${cmd.category}/${commandName}.js`)];
     bot.commands.delete(commandName);
     const pull = require(`../../commands/${cmd.category}/${commandName}.js`);
     bot.commands.set(commandName, pull);
    
    const embed = new djs.MessageEmbed()
    .setDescription(`:white_check_mark: Successfully reloaded \`${commandName}\` command`)
    .setColor("GREEN")
    .setFooter(bot.copyright)
   return msg.channel.send(embed);
    } catch(e) {
        return msg.channel.send(`Cannot reload \`${commandName}\` command`);
    }
    
  }
  
}

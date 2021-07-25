const djs = require("discord.js")
const { Manager } = require("erela.js")
const MineraUtil = require('./MineraUtil.js')
const bot = new djs.Client({ws: {properties: { $browser: "Discord Android"}}})
const fs = require('fs')
const botconfig = require('./botconfig.json')
const Guild = require("./schemas/Guild.js")

bot.manager = new Manager({
    nodes: [{
        identifier: "Node1",
        host: "n1.nighthost.tech",
        port: 37103,
        password: "youshallnotpass",
        clientName: "ErelaJs",
        shards: 1
    }],
    send(id, payload) {
        const guild = bot.guilds.cache.get(id)

        if(guild) {
            guild.shard.send(payload)
        }
    }
})
bot.utils = new MineraUtil(bot);
bot.copyright = "Minera Music 2021";
bot.commands = new djs.Collection();
bot.aliases = new djs.Collection();
bot.categories = fs.readdirSync("./commands")
bot.snek = require('axios');
bot.owners = botconfig.owners;
bot.mongoose = require("./mongoose.js");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});

bot.on("ready", () => {
    bot.user.setActivity("Music for your heart", {type: "LISTENING"})
    bot.manager.init(bot.user.id)
    console.log(`Serving music in ${bot.guilds.cache.size} servers!`)
});

bot.on("raw", (d) => bot.manager.updateVoiceState(d));

bot.manager.on("nodeConnect", (node) => {
    console.log(`Node ${node.options.identifier} is now connected`)
});

bot.manager.on("nodeError", (node, error) => {
    console.log(`Node ${node.options.identifier} had an error: ${error.message}`)
});

bot.manager.on("trackStart", (player, track) => {
    let embed = new djs.MessageEmbed()
    .setDescription(`Now Playing: **${track.title}**`)
    .setColor("BLUE")
    .setTimestamp()
    .setFooter(`Requested by ${track.requester.tag} | ${bot.copyright}`)
    
    bot.channels.cache.get(player.textChannel).send(embed)
});
bot.manager.on("trackError", (player, error) => {
let embed = new djs.MessageEmbed()
.setDescription(`:x: An error occured while playing this track/playlist`)
.setColor("RED")
.setFooter(`${bot.copyright}`)
.setTimestamp()
bot.channels.cache.get(player.textChannel).send(embed)
})
bot.manager.on("queueEnd", (player) => {
let embed = new djs.MessageEmbed()
.setDescription("The party is over. Add more songs to keep it up!")
.setColor("RED")
.setTimestamp()
.setFooter(bot.copyright)

bot.channels.cache.get(player.textChannel).send(embed)
player.destroy()
});

bot.on("message", async(msg) => {
    const cache = {
        prefix: new Map()
    }
if(!msg.guild) return;
let settings;
 settings = await Guild.findOne({
        guildID: msg.guild.id
    });
    if(!settings){
    let newSettings =  new Guild({
     guildName: msg.guild.name,
      guildID: msg.guild.id,
      prefix: botconfig.prefix
    });
     newSettings.save();

    }
if(msg.author.bot) return;
let prefix;
if(settings) {

    prefix = msg.guild &&
      (cache.prefix.get(msg.guild.id)
      || settings.prefix)
      || botconfig.prefix
  } else {
    prefix = msg.guild 
  }
  
  if (msg.guild) {
    if (!cache.prefix.has(msg.guild.id))
      cache.prefix.set(msg.guild.id, prefix);
    setTimeout(() => cache.prefix.delete(msg.guild.id), 5000);
bot.prefix = prefix
  }
if(!msg.content.startsWith(prefix)) return;

if (!msg.member) msg.member = await msg.guild.fetchMember(msg);
  
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    
    if(!command) return;
    
command.run(bot, msg, args);
})
bot.mongoose.init()
bot.login(botconfig.token);
const {Client, Collection, MessageEmbed} = require('discord.js');
const config = require('./config.json')
const fs = require('fs');

const client = new Client();
client.commands = new Collection();

const prefix = '$';

fs.readdir('./commands/', (err, files) => {
    if(err)console.log(err);
    let jsfile = files.filter(file => file.split(".").pop() === "js")

    if(jsfile.length <= 0){
        console.log("Error finding commands.")
        return;
    }

    jsfile.forEach((file,index) => {
        let props = require(`./commands/${file}`)
        client.commands.set(props.help.name, props)
    })

    console.log("All commands loaded.")
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if(message.author.bot)return;
    if(!message.content.startsWith(prefix))return;
    
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    let commandFile = client.commands.get(command);

    if(commandFile) commandFile.run(client, message, args)
    else {
        const errorEmbed = new MessageEmbed()
                        .setTitle('404: Command Not Found')
                        .setFooter('Try $help to see the list of commands')
                        .setColor(0xff0000)
                        .setDescription('Yo! Use the right command!')
                        .attachFiles(['./assets/404.png'])
                        .setImage('attachment://404.png')
        message.channel.send(errorEmbed);
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Nikko Nikko Niiiiii, ${member}`);
});


client.login(config.BOT_TOKEN);

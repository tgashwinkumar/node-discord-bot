const {Client, MessageEmbed, MessageAttachment} = require('discord.js');
const config = require('./config.json')

const client = new Client();

const prefix = '$';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.author.bot)return;
    if(!msg.content.startsWith(prefix))return;
    
    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    if(msg.content.includes('bot')){
        const tsunAtt = new MessageAttachment('./images/tsun.gif')
        msg.channel.send(`${msg.author}!! Did you mention me ??. Bakaaaa!!`);
        msg.channel.send(tsunAtt)
    }else if(command === 'divide' || command === '/'){
        let answer = 1
        answer = args[0]/args[1];
        msg.reply(`Your answer is ${answer}`)
    }else if(command === 'add' || command === '+'){
        let sum = 0
        const cryAtt = new MessageAttachment('./images/cry.gif')
        for(let i in args){
            sum += parseInt(args[i]) || 0;
        }
        msg.reply(`The sum of numbers is ${sum}`);
        if(sum >= 1000){
            msg.channel.send("Total too long.........")
            msg.channel.send(cryAtt);
        }
    }else if(command === 'multiply' || command === 'mul' || command === '*'){
        let prod = 1
        const cryAtt = new MessageAttachment('./images/cry.gif')
        for(let i in args){
            prod *= parseInt(args[i]) || 1;
        }
        msg.reply(`The product of numbers is ${prod}`);
        if(prod >= 1000){
            msg.channel.send("Product too long.........")
            msg.channel.send(cryAtt);
        }
    }else if(command === 'avatar'|| command === 'ava'){
        msg.reply(msg.author.displayAvatarURL())
        
    }else if (command === 'embed') {
        const embed = new MessageEmbed()
                        .setTitle('A slick little embed')
                        .setFooter('Hehehehehehehe')
                        .setColor(0xff0000)
                        .setDescription('Hello, this is a slick embed!');
        msg.channel.send(embed);
    }else{
        msg.reply("Command not found.");
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Nikko Nikko Niiiiii, ${member}`);
});


client.login(config.BOT_TOKEN);

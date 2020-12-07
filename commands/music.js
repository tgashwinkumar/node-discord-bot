const Discord = require('discord.js')
const cherio = require('cherio')

module.exports.run = async (client, message, args) => {
    if(message.author.username === 'MrRhuezzler'){
        message.reply('Poda parambara naari')
    }else{
        message.reply('You are so cute!!')
    }
}

module.exports.help = {
    name: "music",
}


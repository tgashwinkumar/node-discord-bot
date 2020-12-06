const Discord = require('discord.js')
const request = require('request')
const config = require('../config.json')

module.exports.run = async (client, message, args) => {

    let queryString = args.join('+')

    request({ url: `https://app.zenserp.com/api/v2/search?apikey=${config.API_KEY}&q=${queryString}&tbm=isch&device=desktop&gl=IN&hl=en&location=Madurai,Tamil Nadu,India` },
    (err, response, body) => {
        if(err){
            console.log(err)
            return;
        }else if(response.statusCode === 200){
            const randomPos = Math.floor(Math.random() * 50);
            const imgResults = JSON.parse(body).image_results;
            const imgAttach = new Discord.MessageAttachment(imgResults[randomPos].sourceUrl)
            console.log(imgAttach)
            message.channel.send(`Here is your image!\n`);
            message.channel.send(imgAttach)
        }
    });
}

module.exports.help = {
    name: "getimage",
}
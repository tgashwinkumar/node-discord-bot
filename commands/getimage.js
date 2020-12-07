const Discord = require('discord.js')
const request = require('request')
const config = require('../config.json')
let sourceBool = false

module.exports.run = async (client, message, args) => {
    
    let queryString = args.join('+')
    
    if(args[0] === 'source'){
        args.shift()
        sourceBool = true;
    }
    
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
            if(sourceBool){
                console.log(imgResults[randomPos])
                message.channel.send(`The title is: ${imgResults[randomPos].title}`)
                message.channel.send(`The source is: ${imgResults[randomPos].source}`)
                message.channel.send(`The link is: ${imgResults[randomPos].link}`)
            }else{
                message.channel.send(`Here is your image!\n`);
                message.channel.send(imgAttach)
            }
        }
    });
}

module.exports.help = {
    name: "getimage",
}
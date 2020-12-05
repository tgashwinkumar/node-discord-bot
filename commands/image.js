const {MessageAttachment} = require('discord.js');
const cherio = require('cherio');
const request = require('request');
const fs = require('fs');

var WriteStream  = fs.createWriteStream("ImagesLink.txt", "UTF-8");

module.exports.run = async (client, message, args) => {
    let imageArray = [];
    let queryString = args.toString().replace(',','+')
    
    request(`https://www.bing.com/images/search?q=${queryString}&first=1&tsc=ImageBasicHover`, (err, resp, html)=>{
    if(!err && resp.statusCode == 200){
        console.log("Request was success");
        
        // Define Cherio or $ Object 
        const $ = cherio.load(html);
        
        $("img").each((index, image)=>{
            var img = $(image).attr('src');
            if(img.includes('https')){
                imageArray.push(img)
                // console.log(img)
                WriteStream.write(img);
                WriteStream.write("\n");
            }else{img = 'No image found'}
        }); 
        console.log(imageArray.slice(0).slice(0))
        const sendIMG = new MessageAttachment(imageArray[1])
        message.channel.send(`Here is your image!\n`);
        message.channel.send(sendIMG)
    }else{
        console.log("Request Failed ");
    }
});
}

module.exports.help = {
    name: "image",
}
const Discord = require('discord.js')
const request = require('request');
const cheerio = require('cheerio')
const ytdl = require('discord-ytdl-core')
const fs = require('fs')

var WriteStream  = fs.createWriteStream("./musicwritefile.txt", "UTF-8");

module.exports.run = async (client, message, args) => {
    let queryString = args.toString().replace(',','+')
    request(`https://www.youtube.com/results?search_query=${queryString}&page&utm_source=opensearch`, 
    (err, resp, html)=> {
        
        if(!err && resp.statusCode == 200){
            console.log("Request was success");
            
            // Define Cherio or $ Object 
            const $ = cheerio.load(html);
            
            if(!err && resp.statusCode == 200){
                console.log("Request was success");
                
                // Define Cherio or $ Object 
                const $ = cheerio.load(html);
                // let thb = $("img")
                // console.log(thb);
                console.log((".yt-simple-endpoint"))

                console.log("failed.")
            }else{
                console.log("Request Failed ");
            }
        }
    })
}

module.exports.help = {
    name: "music",
}
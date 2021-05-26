const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "~";



Client.on("ready", () => {
    console.log("Bot Pret");
});


Client.on("message", message =>{
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Échec de l'action.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni.");
                }
                else {
                    message.reply("Impossible de bannir ce membre.")
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Échec de l'action.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick.");
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }
        
        
    }
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if(args[1] == undefined){
                message.reply("Échec de l'action.");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("Échec de l'action.");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Supression de " + messages.size + " messages réussi. ");
                        message.reply("Supression de " + messages.size + " messages réussi. ");
                    }).catch(err => {
                        console.log("Erreur de supression : " + err);
                    });
                }
            }
        }
    }
})

Client.on("ready", () => {
    function randomStatus() {
        let status = ["~help", "test", "Yova"]
        let rstatus = Math.floor(Math.random() * status.length);

        Client.user.setActivity(status[rstatus], {type: "WATCHING", url: "https://www.twitch.tv/yovadn"});
    }; setInterval(randomStatus, 2000)
});


Client.login("ODQ2ODgzNTUzMzI0MDQwMjUz.YK1_xQ.CXyolsIdlo5WJuvD1kAF-7VRKLs");
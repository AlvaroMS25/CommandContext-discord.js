const fs = require('fs');
const {Collection} = require('discord.js');
const path = require('path');

class CommandHandler{
    constructor(bot){
        this.bot = bot;
    }
    async LoadCommands(dir){
        this.bot.commands = new Collection();
        let files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
        files.forEach(file => {
            let file_path = path.join(dir, file);
            let command = require(file_path);
            this.bot.commands.set(command.name, command);
            console.log(`Command ${command.name} loaded`)
        });
    }
}

module.exports = {
    CommandHandler: CommandHandler
}
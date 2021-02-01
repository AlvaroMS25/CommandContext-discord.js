const {CommandContext} = require('./CommandContext');
const {Collection} = require('discord.js');

export class CommandExecutor{
    allowDM = true;

    constructor(client, ignoreBots = false){
        this.bot = client;
        this.bot.commands = new Collection();
        this.ignoreBots = ignoreBots
    }

    async execute(message, prefix){
        if (this.allowDM === false){
            if(message.channel.type === 'dm') return ;
        }
        if(this.ignoreBots === true && message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let ctx = new CommandContext(this.bot, message)
    
        let cmd = this.bot.commands.get(command) || this.bot.commands.find((c) => c.aliases.includes(command))
        if(cmd){
            return await cmd.run(this.bot, ctx, args);
        }
    }

    async executeWithMultiplePrefixes(message, prefixes) {
        if (this.allowDM === false){
            if(message.channel.type === 'dm') return ;
        }
        if(this.ignoreBots === true && message.author.bot) return;
        for (const prefix of prefixes) {
            if(message.content.startsWith(prefix)) {
                let args = message.content.slice(prefix.length).trim().split(/ +/g);
                let command = args.shift().toLowerCase();
                let ctx = new CommandContext(this.bot, message)

                let cmd = this.bot.commands.get(command) || this.bot.commands.find((c) => c.aliases.includes(command))
                if(cmd){
                    return await cmd.shouldRun(this.bot, ctx, args);
                }
            }
        }
    }

    registerCommand(command) {
        this.bot.commands.set(command.name, command);
    }

    unregisterCommand(name) {
        return this.bot.commands.delete(name);
    }
}
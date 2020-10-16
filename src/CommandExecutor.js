const {CommandContext} = require('./CommandContext');

class CommandExecutor{
    allowDM = true;

    constructor(bot, ignoreBots = false){
        this.bot = bot;
        this.ignoreBots = ignoreBots
    }

    async execute(message, prefix = ""){
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

    async executeWithMultiplePrefixes(message, prefixes = [""]) {

    }
}


module.exports = {
    CommandExecutor: CommandExecutor
}
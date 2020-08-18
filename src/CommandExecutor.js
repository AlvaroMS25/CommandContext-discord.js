const {CommandContext} = require('./CommandContext');

class CommandExecutor{
    constructor(bot){
        this.bot = bot;
    }

    async Execute(message, prefix){
        if(message.author.bot) return ;
        if(message.channel.type === 'dm') return ;
        if(!message.content.startsWith(prefix)) return;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let ctx = new CommandContext(bot, message)
    
        let cmd = bot.commands.get(command) || bot.commands.find((c) => c.aliases.includes(command))
        if(cmd){
            return await cmd.run(bot, ctx, args);
        }
    }
}


module.exports = {
    CommandExecutor: CommandExecutor
}
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
        let ctx = new CommandContext(this.bot, message)
    
        let cmd = this.bot.commands.get(command) || this.bot.commands.find((c) => c.aliases.includes(command))
        if(cmd){
            return await cmd.run(this.bot, ctx, args);
        }
    }
}


module.exports = {
    CommandExecutor: CommandExecutor
}
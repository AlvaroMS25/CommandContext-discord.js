const {CommandContext} = require('./CommandContext');

class CommandExecutor{
    constructor(bot, allowDM = false){
        if(!(typeof(allowDM) === 'boolean')) throw 'allowDM parameter must be a boolean';
        this.bot = bot;
        this.allowDM = allowDM;
    }

    async Execute(message, prefix){
        if (this.allowDM === false){
            if(message.channel.type === 'dm') return ;
        }
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let final_args = "";
        args.forEach(arg => {
            final_args += ` ${arg}`;
        });
        let ctx = new CommandContext(this.bot, message)
    
        let cmd = this.bot.commands.get(command) || this.bot.commands.find((c) => c.aliases.includes(command))
        if(cmd){
            return await cmd.run(this.bot, ctx, final_args);
        }
    }
}


module.exports = {
    CommandExecutor: CommandExecutor
}
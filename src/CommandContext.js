
class CommandContext{
    constructor(bot, message){
        this.bot = bot;
        this.message = message;
        this.guild = message.guild;
        this.channel = message.channel;
        this.author = message.author;
        this.IsBot = message.author.bot || null;
    }

    async send(args){
        return this.channel.send(args);
    }
    
    async reply(args){
        return this.channel.send(`${this.author.mention}, ${args}`);
    }

    async direct(args){
        return this.author.send(args);
    }
}

module.exports = {
    CommandContext: CommandContext
}
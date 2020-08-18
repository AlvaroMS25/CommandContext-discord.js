
class CommandContext{
    constructor(Bot, message){
        this.bot = Bot;
        this.message = message;
        this.guild = message.guild;
        this.channel = message.channel;
        this.author = message.author;
        
    }

    async send(args){
        await this.channel.send(args);
    }
    
    async reply(args){
        await this.channel.send(`${this.author.mention}, ${args}`);
    }

    async direct(args){
        await this.author.send(args);
    }
}

module.exports = {
    CommandContext: CommandContext
}
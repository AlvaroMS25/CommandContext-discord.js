import discord = require('discord.js');

export class CommandContext{
    bot: discord.Client;
    message: discord.Message;
    guild: discord.Guild;
    channel: discord.TextChannel | discord.DMChannel | discord.NewsChannel;
    author: discord.User;
    IsBot: boolean;

    constructor(bot: discord.Client, message: discord.Message){
        this.bot = bot;
        this.message = message;
        this.guild = message.guild;
        this.channel = message.channel;
        this.author = message.author;
        this.IsBot = message.author.bot;
    }

    async send(args: any){
        return this.channel.send(args);
    }

    async reply(args: any){
        return this.channel.send(`<@${this.author.id}>, ${args}`);
    }

    async direct(args: any){
        return this.author.send(args);
    }
}
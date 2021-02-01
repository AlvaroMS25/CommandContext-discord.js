import discord = require('discord.js');

export class CommandContext {
    bot: discord.Client;
    message: discord.Message;
    guild: discord.Guild | null;
    channel: discord.TextChannel | discord.DMChannel | discord.NewsChannel;
    author: discord.User;
    IsBot: boolean;
    member: discord.GuildMember | null;

    constructor(bot: discord.Client, message: discord.Message){
        this.bot = bot;
        this.message = message;
        this.guild = message.guild;
        this.channel = message.channel;
        this.author = message.author;
        this.IsBot = message.author.bot;
        this.member = message.member;
    }

    async send(args: discord.StringResolvable, options?: discord.MessageOptions | (discord.MessageOptions & { split?: false }) | discord.MessageAdditions){
        return this.channel.send(args);
    }

    async reply(args: discord.StringResolvable, options?: discord.MessageOptions | (discord.MessageOptions & { split?: false }) | discord.MessageAdditions){
        return this.channel.send(`<@${this.author.id}>, ${args}`, options);
    }

    async direct(args: discord.StringResolvable, options?: discord.MessageOptions | (discord.MessageOptions & { split?: false }) | discord.MessageAdditions){
        return this.author.send(args);
    }
}
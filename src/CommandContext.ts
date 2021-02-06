import discord = require('discord.js');
import {Message} from 'discord.js';

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

    send(args: discord.StringResolvable, options?: discord.MessageOptions | (discord.MessageOptions & { split?: false }) | discord.MessageAdditions): Promise<Message> {
        return this.channel.send(args);
    }

    reply(args: discord.StringResolvable, options?: discord.MessageOptions | (discord.MessageOptions & { split?: false }) | discord.MessageAdditions): Promise<Message>{
        return this.channel.send(`<@${this.author.id}>, ${args}`, options);
    }

    direct(args: discord.StringResolvable, options?: discord.MessageOptions | (discord.MessageOptions & { split?: false }) | discord.MessageAdditions): Promise<Message>{
        return this.author.send(args);
    }
}
import discord = require('discord.js');

export declare class EventHandler {
    constructor(bot: discord.Client);
    registerEvent(dir: string): void;
    registerEventsFromDir(dir: string): void;
}
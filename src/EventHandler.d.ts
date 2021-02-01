import discord = require('discord.js');

export declare class EventHandler {
    constructor(bot: discord.Client);
    registerEvent(event: NodeRequire): void;
    registerEventsFromDir(dir: string): void;
}
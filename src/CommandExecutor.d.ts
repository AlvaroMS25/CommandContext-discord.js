import discord = require("discord.js");

export declare class CommandExecutor {
    constructor(client: discord.Client, ignore_bots: boolean);
    execute(message: discord.Message, prefix: string): Promise<void>;
    executeWithMultiplePrefixes(message: discord.Message, prefixes: string[]): Promise<void>;
    registerCommand(command: NodeRequire): void;
    unregisterCommand(name: string): boolean
}
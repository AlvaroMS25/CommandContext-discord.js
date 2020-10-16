import discord = require('discord.js');
import {Command} from './Structs/Commands/Command';

export class CommandExecutor {
    constructor(client: discord.Client);
    execute(message: discord.Message, prefix: string): void;
    executeWithMultiplePrefixes(message: discord.Message, prefixes: string[]): void;
    registerCommand(command: Command)
}
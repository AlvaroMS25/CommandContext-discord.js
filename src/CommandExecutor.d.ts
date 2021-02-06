import discord = require("discord.js");
import {PrefixProvider} from "./Commands/PrefixProvider";
import {Command} from './Commands/Command';

export declare class CommandExecutor {
    constructor(client: discord.Client, ignore_bots: boolean);
    registerCommand(command: Command): void;
    unregisterCommand(name: string): boolean;
    registerCommandsFromDir(dir: string): void;
    setPrefixProvider(provider: PrefixProvider): void;
    setPrefixes(prefixes: string[]): void;
    setPrefix(prefix: string): void;
    addPrefix(prefix: string): void;
    removePrefix(prefix: string): void;
}
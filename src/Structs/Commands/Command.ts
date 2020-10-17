import {Runnable} from '../Shared/Runnable';
import {Permissions} from './Permissions';
import {CommandContext} from '../../CommandContext'
import {CommandOptions} from './Options';
import discord = require('discord.js');


export class Command implements Runnable {
    name: string;
    aliases: string[];
    OwnerOnly: boolean;
    GuildOnly: boolean;
    RequiredPermissions?: Permissions[] = null

    constructor(CommandOptions: CommandOptions) {
        this.name = CommandOptions.name;
        this.aliases = CommandOptions.aliases || null;
        this.OwnerOnly = CommandOptions.OwnerOnly;
        this.GuildOnly = CommandOptions.GuildOnly;
        this.RequiredPermissions = CommandOptions.RequiredPermissions || null;
    }

    run(client: discord.Client, ctx: CommandContext, args: string[]): void {
        throw 'Run method not overrided on command class';
    }

}
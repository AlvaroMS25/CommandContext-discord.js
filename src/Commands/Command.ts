import {Permissions} from './Permissions';
import {CommandContext} from '../CommandContext'
import {CommandOptions} from './Options';
import discord = require('discord.js');
import { Arguments } from './Arguments';


export class Command {
    name: string;
    aliases: string[];
    OwnerOnly: boolean;
    GuildOnly: boolean;
    RequiredPermissions: Permissions[];

    constructor(options: CommandOptions) {
        this.name = options.name;
        this.aliases = options?.aliases || [];
        this.OwnerOnly = options?.OwnerOnly || false;
        this.GuildOnly = options?.GuildOnly || false;
        this.RequiredPermissions = options?.RequiredPermissions || [];
    }

    async run(client: discord.Client, ctx: CommandContext, args: Arguments) {
        throw 'Run method not overrided on command class';
    }

    async shouldRun(client: discord.Client, ctx: CommandContext, args: Arguments) {
        if (this.RequiredPermissions.length == 0) {
            await this.run(client, ctx, args);
        } else {
            if(!ctx.member?.hasPermission(this.RequiredPermissions)) return;
            
            await this.run(client, ctx, args);
        }
    }

}
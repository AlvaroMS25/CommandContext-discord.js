import {Permissions} from './Permissions';
import {CommandContext} from '../CommandContext'
import {CommandOptions} from './Options';
import discord = require('discord.js');
import { Arguments } from './Arguments';


export class Command {
    name: string;
    aliases: string[];
    ownerOnly: boolean;
    guildOnly: boolean;
    requiredPermissions: Permissions[];
    desciption?: string;

    constructor(options: CommandOptions) {
        this.name = options.name;
        this.aliases = options?.aliases || [];
        this.ownerOnly = options?.ownerOnly || false;
        this.guildOnly = options?.guildOnly || false;
        this.requiredPermissions = options?.requiredPermissions || [];
    }

    async run(client: discord.Client, ctx: CommandContext, args: Arguments) {
        throw 'Run method not overriden on command class';
    }

    async shouldRun(client: discord.Client, ownerIds: string[], ctx: CommandContext, args: Arguments) {
        if(ctx.guild !== null) {
            if(ctx.member === null) return;

            if(this.requiredPermissions.length !== 0) {
                if(!ctx.member?.hasPermission(this.requiredPermissions)) return;
            }
        } else {
            if(this.guildOnly) return;
            if(this.requiredPermissions.length !== 0) return;
        }

        if(this.ownerOnly) {
            if(!ownerIds.includes(ctx.author.id)) return;
        }

        await this.run(client, ctx, args).catch(e => console.warn(`Command ${this.name} had an uncaught exception: ${e}`));
    }

}
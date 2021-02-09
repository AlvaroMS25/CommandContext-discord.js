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
    description?: string;
    private subCommands: discord.Collection<string, Command> = new discord.Collection();

    constructor(options: CommandOptions) {
        this.name = options.name;
        this.aliases = options?.aliases || [];
        this.ownerOnly = options?.ownerOnly || false;
        this.guildOnly = options?.guildOnly || false;
        this.requiredPermissions = options?.requiredPermissions || [];
        this.description = options.description;

        if(options.subCommands !== undefined) {
            for(const command of options.subCommands) {
                this.registerSubCommand(command);
            }
        }
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

        let clone = args.clone();
        let next = clone.next();
        if(this.isSubCommand(next)) {
            this.executeSubCommand(next, client, ownerIds, ctx, clone);
            return;
        }

        this.run(client, ctx, args).catch(e => console.warn(`Command ${this.name} had an uncaught exception: ${e}`));
    }

    isSubCommand(nameOrAlias: string): boolean {
        let cmd = this.subCommands.get(nameOrAlias) || this.subCommands.find((c) => c.aliases.includes(nameOrAlias));
        if(cmd) return true;
        else return false;
    }

    async executeSubCommand(nameOrAlias: string, client: discord.Client, ownerIds: string[], ctx: CommandContext, args: Arguments): Promise<void> {
        let cmd = this.subCommands.get(nameOrAlias) || this.subCommands.find((c) => c.aliases.includes(nameOrAlias));

        cmd!!.shouldRun(client, ownerIds, ctx, args)
    }

    registerSubCommand(command: Command) {
        this.subCommands.set(command.name, command);
    }

    registerSubCommands(commands: Command[]) {
        for(const command of commands) {
            this.registerSubCommand(command);
        }
    }
}
import {Permissions} from './Permissions';
import {Command} from './Command';

export interface CommandOptions {
    name: string;
    aliases? : string[];
    ownerOnly?: boolean;
    guildOnly?: boolean;
    requiredPermissions?: Permissions[];
    description?: string;
    subCommands?: Command[];
    allowedChannels?: string[];
}
import {Permissions} from './Permissions';

export interface CommandOptions {
    name: string;
    aliases? : string[];
    ownerOnly?: boolean;
    guildOnly?: boolean;
    requiredPermissions?: Permissions[] | null;
    description?: string
}
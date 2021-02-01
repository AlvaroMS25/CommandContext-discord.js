import {Permissions} from './Permissions';

export interface CommandOptions {
    name: string;
    aliases? : string[];
    OwnerOnly?: boolean;
    GuildOnly?: boolean;
    RequiredPermissions?: Permissions[] | null;
}
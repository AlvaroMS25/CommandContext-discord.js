import {Runnable} from '../Shared/Runnable';
import {Permissions} from './Permissions';
import {CommandContext} from '../../CommandContext'


export class Command implements Runnable {
    name: string;
    aliases: string[];
    OwnerOnly: boolean;
    GuildOnly: boolean;
    PermissionLevel?: Permissions[] = null

    run(client, ctx: typeof CommandContext, args: string[]): Promise<void> {
        throw 'Run method not overrided on command class';
    }

}
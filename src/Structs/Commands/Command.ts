import {Runnable} from '../Shared/Runnable';
import {Permissions} from './Permissions';


export class Command implements Runnable {
    name: string
    aliases: string[];
    OwnerOnly: false;
    GuildOnly: false;
    PermissionLevel?: Permissions[] | null

    run(): Promise<void> {
        throw 'Run method not overrided on command class';
    }

}
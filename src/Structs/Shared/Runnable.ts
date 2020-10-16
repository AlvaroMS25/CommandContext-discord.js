import {CommandContext} from '../../CommandContext'
import {Client} from 'discord.js';

export interface Runnable {
    run(client: Client, ctx: typeof CommandContext, args: string[]) : void;
}
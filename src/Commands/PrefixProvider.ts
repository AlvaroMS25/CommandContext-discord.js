import {Message, Client} from "discord.js";

export class PrefixProvider {
    provide(client: Client, msg: Message): string {
        throw "`provide()` method not overriden on PrefixProvider";
    }
}
import {Message, Client} from "discord.js";

export class PrefixProvider {
    async provide(client: Client, msg: Message): Promise<string> {
        throw "`provide()` method not overriden on PrefixProvider";
    }
}
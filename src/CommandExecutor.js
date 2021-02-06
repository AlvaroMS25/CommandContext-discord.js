const {CommandContext} = require('./CommandContext');
const {PrefixProvider} = require("./Commands/PrefixProvider");
const {Collection} = require('discord.js');
const fs = require("fs");
const path = require("path");

export class CommandExecutor{
    allowDM = true;
    provider = null;
    prefixes = [];

    constructor(client, ignoreBots = false){
        this.bot = client;
        this.bot.commands = new Collection();
        this.ignoreBots = ignoreBots;

        this.registerMessageEvent(client);
    }

    setPrefixProvider(provider) {
        if(!(provider instanceof PrefixProvider)) {
            throw "Provider must extend PrefixProvider class";
        } else {
            this.provider = provider;
        }
    }

    setPrefixes(prefixes) {
        this.prefixes = prefixes
    }

    setPrefix(prefix) {
        this.prefixes = [prefix];
    }

    addPrefix(prefix) {
        this.prefixes.push(prefix);
    }

    removePrefix(prefix) {
        const index = this.prefixes.indexOf(prefix);
        if(index !== -1) {
            this.prefixes.splice(index, 1);
        }
    }

    async execute(message, prefix){
        if (this.allowDM === false){
            if(message.channel.type === 'dm') return ;
        }
        if(this.ignoreBots === true && message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let ctx = new CommandContext(this.bot, message)
    
        let cmd = this.bot.commands.get(command) || this.bot.commands.find((c) => c.aliases.includes(command))
        if(cmd){
            return await cmd.run(this.bot, ctx, args);
        }
    }

    async executeWithMultiplePrefixes(message, prefixes) {
        if (this.allowDM === false){
            if(message.channel.type === 'dm') return ;
        }
        if(this.ignoreBots === true && message.author.bot) return;
        for (const prefix of prefixes) {
            if(message.content.startsWith(prefix)) {
                let args = message.content.slice(prefix.length).trim().split(/ +/g);
                let command = args.shift().toLowerCase();
                let ctx = new CommandContext(this.bot, message)

                let cmd = this.bot.commands.get(command) || this.bot.commands.find((c) => c.aliases.includes(command))
                if(cmd){
                    return await cmd.shouldRun(this.bot, ctx, args);
                }
            }
        }
    }

    registerCommandsFromDir(dir) {
        let files = fs.readdirSync(dir).filter((f) => (f.endsWith(".js") || f.endsWith(".ts")));
        files.forEach(file => {
            let file_path = path.join(dir, file);
            let required = require(file_path);
            try {
                var command = required.setup();
            } catch(e) {
                throw `Setup function missing on command from dir ${file_path}`
            }

            this.bot.commands.set(command.name, command);
        });
    }

    registerCommand(command) {
        this.bot.commands.set(command.name, command);
    }

    unregisterCommand(name) {
        return this.bot.commands.delete(name);
    }

    async handleCommand(message) {
        if(this.provider != null) {
            let prefix = this.provider.provide(message);

            await this.execute(message, prefix);
        } else {
            if(this.prefixes.length === 0) {
                throw "No prefixes specified at CommandExecutor";
            } else {
                await this.executeWithMultiplePrefixes(message, this.prefixes);
            }
        }
    }

    registerMessageEvent(client) {
        client.on("message", async(message) => {
            try {
                await this.handleCommand(message);
            } catch (e) {
                throw e;
            }
        });
    }
}

exports.CommandExecutor = CommandExecutor;
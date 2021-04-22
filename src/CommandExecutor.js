const {CommandContext} = require('./CommandContext');
const {PrefixProvider} = require("./Commands/PrefixProvider");
const {Arguments} = require("./Commands/Arguments");
const {Collection} = require('discord.js');
const {Command} = require("./Commands/Command");
const fs = require("fs");
const path = require("path");

class CommandExecutor{
    allowDM = true;
    provider = null;
    prefixes = [];
    ownerIds = [];

    constructor(client, ownerIds = [], ignoreBots = false){
        this.bot = client;
        this.bot.commands = new Collection();
        this.ownerIds = ownerIds;
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


    async execute(message, prefixes) {
        if (this.allowDM === false){
            if(message.channel.type === 'dm') return ;
        }
        if(this.ignoreBots === true && message.author.bot) return;
        for (const prefix of prefixes) {
            if(message.content.startsWith(prefix)) {
                let split_args = message.content.slice(prefix.length).trim().split(/ +/g);
                let args = new Arguments(split_args);
                let command = split_args.shift().toLowerCase();
                let ctx = new CommandContext(this.bot, message)

                let cmd = this.bot.commands.get(command) || this.bot.commands.find((c) => c.aliases.includes(command))
                if(cmd){
                    return await cmd.shouldRun(this.bot, this.ownerIds, ctx, args);
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
        if(!(command instanceof Command)) throw "Command must be an instance of framework's `Command` class";
        this.bot.commands.set(command.name, command);
    }

    unregisterCommand(name) {
        return this.bot.commands.delete(name);
    }

    async handleCommand(message) {
        if(this.provider != null) {
            const prefix = await this.provider.provide(this.bot, message);

            await this.execute(message, [prefix]);
        } else {
            if(this.prefixes.length === 0) {
                throw "No prefixes specified at CommandExecutor";
            } else {
                await this.execute(message, this.prefixes);
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
const fs = require('fs');
const path = require('path');

class EventHandler{
    constructor(bot){
        this.bot = bot;
    }

    registerEventsFromDir(dir){
        let files = fs.readdirSync(dir).filter((f) => f.endsWith(".js"));
        files.forEach(file => {
            let eventName = file.substring(0, file.indexOf(".js"));
            let file_path = path.join(dir, file)
            let eventFile = require(file_path);

            this.bot.on(eventName, eventFile.bind(null, this.bot));
        });
    }

    registerEvent(dir) {
        if(!dir.endsWith('.js')) throw "Invalid event file provided to `registerEvent`";
        let requireFile = require(dir);

        if(requireFile == null || requireFile == undefined) {
            throw "Invalid event file provided to `registerEvent`";
        } else {
            let filename = dir.replace(/^.*[\\\/]/, '')

            let event_name = filename.substring(0, filename.indexOf(".js"));

            this.bot.on(event_name, requireFile.bind(null, this.bot));
        }
    }
}

exports.EventHandler = EventHandler;
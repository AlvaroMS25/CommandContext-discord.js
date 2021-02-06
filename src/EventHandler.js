const fs = require('fs');
const path = require('path');

class EventHandler{
    constructor(bot){
        this.bot = bot;
    }

    registerEventsFromDir(dir){
        let files = fs.readdirSync(dir).filter((f) => (f.endsWith(".js") || f.endsWith(".ts")));
        files.forEach(file => {
            let eventName = file.substring(0, file.indexOf(".js"));
            let file_path = path.join(dir, file)
            let eventFile = require(file_path);

            this.bot.on(eventName, eventFile.bind(null, this.bot));
            console.log(`Loaded event ${eventName}`);
        });
    }

    registerEvent(dir) {
        let file = fs.readFileSync(dir).filter(f => (f.endsWith(".js") || f.endsWith(".ts")));

        if(file == null || file == undefined) {
            throw "Invalid file provided to `registerEvent`";
        } else {
            let event_name = file.substring(0, file.indexOf(".js"));
            let requireFile = require("dir");

            this.bot.on(eventName, eventFile.bind(null, this.bot));
            console.log(`Loaded event ${eventName}`);
        }
    }
}

exports.EventHandler = EventHandler;
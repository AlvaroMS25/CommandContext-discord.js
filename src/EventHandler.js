const fs = require('fs');
const path = require('path');

export class EventHandler{
    constructor(bot){
        this.bot = bot;
    }

    registerEventsFromDir(dir){
        let files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
        files.forEach(file => {
            let eventName = file.substring(0, file.indexOf(".js"));
            let file_path = path.join(dir, file)
            let eventFile = require(file_path);

            this.bot.on(eventName, eventFile.bind(null, this.bot));
            console.log(`Loaded event ${eventName}`);
        });
    }

    registerEvent(event){
        let event_name = event.name;

        this.bot.on(event_name, event.bind(null, this.bot));
    }
}
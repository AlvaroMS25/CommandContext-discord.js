const fs = require('fs');
const path = require('path');

class EventHandler{
    constructor(bot){
        this.bot = bot;
    }

    async LoadEvents(dir){
        let files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
        files.forEach(file => {
            let eventName = file.substring(0, file.indexOf(".js"));
            let file_path = path.join(dir, file)
            let eventFile = require(file_path);

            this.bot.on(eventName, eventFile.bind(null, this.bot));
            console.log(`Loaded event ${eventName}`);
        });
    }

    async addEvent(){}
}

module.exports = {
    EventHandler: EventHandler
}
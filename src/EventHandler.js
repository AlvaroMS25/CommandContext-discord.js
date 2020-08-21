const fs = require('fs');
const path = require('path');

class EventHandler{
    constructor(bot){
        this.bot = bot;
    }

    async Start(dir){
        /**
         * Loads and binds client events with file events based on its names
         * 
         * @param directory to search event files
         */
        let files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
        files.forEach(file => {
            let eventName = file.substring(0, file.indexOf(".js"));
            let file_path = path.join(dir, file)
            let eventFile = require(file_path);

            this.bot.on(eventName, eventFile.bind(null, this.bot));
            console.log(`Loaded event ${eventName}`);
        });
    }
}

module.exports = {
    EventHandler: EventHandler
}
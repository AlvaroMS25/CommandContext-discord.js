const fs = require('fs');
const path = require('path');

class EventHandler{
    constructor(bot, dir){
        this.bot = bot;
        this.dir = dir;
    }

    async Start(){
        let files = fs.readdirSync(this.dir).filter((f) => f.endsWith('.js'));
        files.forEach(file => {
            let eventName = file.substring(0, file.indexOf(".js"));
            let file_path = path.join(this.dir, file)
            let eventFile = require(file_path);

            this.bot.on(eventName, eventFile.bind(null, this.bot));
            console.log(`Loaded event ${eventName}`);
        });
    }
}

module.exports = {
    EventHandler: EventHandler
}
const SQL = require('mysql2/promise');

class SQLExecutor{
    constructor(host, user, password, database){
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }

    async GetConn(){
        return await SQL.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
    }

    async Execute(query){
        try {
            let conn = await this.GetConn();
            const [r, u] = await conn.query(query);
            conn.end();
            return r[0];

        } catch(err) {
            throw "Error during SQL operations";
        }
    }

    async RawExecute(query){
        try {
            let conn = await this.GetConn();
            const [r, u] = await conn.query(query);
            conn.end();
            return [r, u];
        } catch (e) {
            throw "Error during SQL operations";
        }
    }

    GetOptions(){
        return {
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database || null
        };
    }
}

module.exports = {
    SQLExecutor: SQLExecutor
}
export class SQLExecutor {
    constructor(host: string, user: string, password: string, database: string);
    Execute(query: string): any;
    RawExecute(query: string):[any, any]
    GetOptions(): object
}
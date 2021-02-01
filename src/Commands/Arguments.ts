import { rejects } from "assert";
import { resolve } from "path";

export class Arguments {
    constructor(private _args: string[]) {}
    get args() {
        return this._args;
    }

    set args(new_args: string[]) {
        this._args = new_args;
    }

    remaining(): string[] {
        return this._args;
    }

    advance(many: number): string[] {
        let advanceds = this._args.splice(0, many);
        return advanceds;
    }

    join(): string {
        let joined = this._args.join(" ");

        return joined;
    }

    next() {
        return this.advance(1);
    }
}
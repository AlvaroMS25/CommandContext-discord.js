export class Arguments {
    constructor(private _args: string[]) {}
    raw(): string[] {
        return this._args;
    }

    get args(): string[] {
        return this._args;
    }

    set args(args: string[]) {
        this._args = args;
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

    next(): string {
        return this.advance(1).toString();
    }

    clone(): Arguments {
        return new Arguments(this._args.slice());
    }
}
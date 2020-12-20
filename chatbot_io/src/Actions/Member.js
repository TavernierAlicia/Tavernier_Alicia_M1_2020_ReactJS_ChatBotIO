export default class Member {

    name = null;
    id = null;
    commandsList = [];
    canwrite = true;

    constructor(name, id, commands, nocanwrite = false) {
        this.name = name;
        this.id = id;
        this.canwrite = !nocanwrite;
        this.commandsList = commands;
    }



    getCommands() {
        return this.commandsList;
    }

    getCommand(msg) {
        for (let c of this.commandsList) {
            let tests = [c.input, ...c.alias];
            for (let test of tests) {
                // if (test.indexOf(msg) !== -1) {
                //     return c.res(msg);
                // }

                if (test === msg) return c.res(msg);
            }
        }
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    canWrite() {
        return this.canwrite;
    }
}
export default class Member {

    pic = null
    name = null
    id = null
    commandsList = []
    canwrite = true

    constructor(name, id, commands, pic="", nocanwrite = false) {
        this.name = name
        this.id = id
        this.pic = pic 
        this.canwrite = !nocanwrite
        this.commandsList = commands
    }

    getCommands() {
        return this.commandsList
    }

    getCommand(msg) {
        for (let c of this.commandsList) {
            let tests = [c.input, ...c.alias]
            for (let test of tests) {
                if (msg.indexOf(test) === 0) {
                    return c.res(msg);
                }
            }
        }
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    canWrite() {
        return this.canwrite
    }

    getPic() {
        return this.pic
    }
}
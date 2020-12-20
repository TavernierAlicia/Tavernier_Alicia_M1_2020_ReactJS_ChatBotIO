import Member from './Member.js';

const commands = [
    {
        input: "Hello?",
        alias: [],
        desc: "Answers first user question",
        res: _ => "Hello " + localStorage.getItem('username') + "!"
    },{
        input: "What is that?",
        alias: [],
        desc: "Answers second user question",
        res: _ => "It's a react chatbot!"
    },{
        input: "What can I do on this interface?",
        alias: [],
        desc: "Answers third user question",
        res: _ => "Ask 'help?' to different bots know how to talk to them!"
    },{
        input: "help?",
        alias: ["help!", "help"],
        desc: "Answers fouth user question",
        res: _ => "I say 'to different bots'. I'm the administrator, I don't have time to talk with you. Try to change channel on top of the screnn"
    }
]

export default class Admin extends Member {

    constructor() {
        // human_name, id_name, commands_list, is_disabled
        super('Admin', 'admin', commands, true);
    }

}
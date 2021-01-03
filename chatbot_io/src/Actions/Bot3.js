import Member from './Member.js';

// manage netflix
function netflix() {
    window.open('https://www.netflix.com')
    return "Ok."
}

// manage games
function games(game) {
    switch (game.toLowerCase()) {
        case "geo":
            window.open('https://www.geoguessr.com/signin')
            return "Openning Geoguessr... Ok."
        case "slither":
            window.open('http://slither.io')
            return "Openning SlitherIO... Ok."
        case "agar":
            window.open('https://agar.io')
            return "Openning AgarIO... Ok."
        case "diep":
            window.open('https://diep.io')
            return "Openning DiepIO... Ok."
        case "draw":
            window.open('https://skribbl.io')
            return "Openning SkribblIO... Ok."
        default:
            return "Couldn't open "+game
    }
}



// manage music
function music(service) {
    if (service.toLowerCase() === "spotify") {
        window.open('https://www.spotify.com')
        return "Openning Spotify... Ok"
    } else if (service.toLowerCase() === "deezer") {
        window.open('https://www.deezer.com')
        return "Openning Deezer... Ok"
    } else {
        return "Couldn't open "+service
    }
}


const commands = [
    // Commons commands
    {
        input: "/hello",
        alias: [],
        desc: "Answers default question /hello",
        res: _ => "Hello " + localStorage.getItem('username') + "!"
    },{
        input: "/who",
        alias: [],
        desc: "Answers default question /who",
        res: _ => "I'm Rupert, the #3 bot, I'm here to distract you."
    },{
        input: "/help",
        alias: [],
        desc: "Answers default question /help",
        res: _ => "/hello to say 'hello', /who to ask 'who am I' and /advise to have some random advices "
    },
    // Specific commands
    {
        input: "/netflix",
        alias: [],
        desc: "Open Netflix",
        res: _ => "Openning Netflix..." + netflix()
    },
    {
        input: "/game",
        alias: [],
        desc: "Answers third user question",
        res: _ => ""+games("agar")
    },
    {
        input: "/music",
        alias: [],
        desc: "Answers third user question",
        res: _ => ""+music("Spotify")
    },
]

// TODO: default "ask for help answer"

export default class Bot2 extends Member {

    constructor() {
        // human_name, id_name, commands_list, is_disabled
        super('Bot 3', 'bot3', commands);
    }

}
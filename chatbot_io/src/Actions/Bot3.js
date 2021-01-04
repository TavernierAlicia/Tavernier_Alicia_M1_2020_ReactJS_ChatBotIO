import Member from './Member.js'

// manage netflix
function netflix() {
    window.open('https://www.netflix.com')
    return "Ok."
}

// manage games
function games(game) {
    var games = [
        'https://www.geoguessr.com/signin',
        'http://slither.io',
        'https://agar.io',
        'https://diep.io',
        'https://skribbl.io'
    ] 
    game = game.substring(5).trim()
    switch (game.toLowerCase()) {
        case "geo":
            window.open(games[0])
            return "Openning Geoguessr... Ok."
        case "slither":
            window.open(games[1])
            return "Openning SlitherIO... Ok."
        case "agar":
            window.open(games[2])
            return "Openning AgarIO... Ok."
        case "diep":
            window.open(games[3])
            return "Openning DiepIO... Ok."
        case "draw":
            window.open(games[4])
            return "Openning SkribblIO... Ok."
        case "":
            window.open(games[Math.floor(Math.random() * (games.length))])
            console.log(games)
            return "Opening a random game..."
        default:
            return "Sorry, I don't know this game :("
    }
}


// manage music
function music(service) {
    service = service.substring(6).trim()
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
        res: _ => "I'm a chatbot! Here you can type some commands to do some stuff: \n /hello to say 'hello', \n /who to ask 'who am I', \n /netflix to open Netflix,  \n /gamelist to know the list of my games, \n /game with the name of your game to open a game, \n /music with \"spotify\" or \"deezer\" after to open Spotify or Deezer"
    },
    // Specific commands
    {
        input: "/netflix",
        alias: [],
        desc: "Open Netflix",
        res: _ => "Openning Netflix..." + netflix()
    },
    {
        input: "/gamelist",
        alias: [],
        desc: "Open the games list",
        res: _ => "You can play 5 different games with the command /games: \n -\"geo\" to play Geoguessr, \n -\"agar\" to play Agar.io, \n -\"slither\" to play Slither.io, \n -\"diep\" to play Diep.io, \n -\"draw\" to play Skribbl.io \n \n ... Or just type /games to play a random game!"
    },
    {
        input: "/game",
        alias: [],
        desc: "Open a browser game",
        res: msg => games(msg)
    },
    {
        input: "/music",
        alias: [],
        desc: "Launch Soptify or Deezer",
        res: msg => music(msg)
    },
]


export default class Bot2 extends Member {

    constructor() {
        // human_name, id_name, commands_list, is_disabled
        super('Rupert', 'bot3', commands, "https://www.flaticon.com/svg/static/icons/svg/270/270103.svg")
    }

}
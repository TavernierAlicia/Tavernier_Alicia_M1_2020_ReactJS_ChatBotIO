import Member from './Member.js'

// manage jokes
var jokes = [
    "Why did the chicken commit suicide? \n To get to the other side.",
    "What’s the difference between England and a tea bag? \n The tea bag stays in the cup longer.",
    "I hate Russian Dolls, they are so full of themselves.",
    "A woman gets on a bus with her baby. The driver says \n “Ugh – that’s the ugliest baby I’ve ever seen!” \n The woman walks to the back of the bus and sits down. \n She says to the man next to her: \n “The driver just insulted me!” \n The man says: \n “You go up there and tell him off. Go on. I’ll hold your monkey for you.”",
    "What do you give an armless child for Christmas? \n Nothing, he wouldn’t be able to open it anyways.",
    "Excuse me, how do I get to the hospital quickly? \n Just stand in the middle of the road for a while.",
    "If you donate a kidney, everybody loves you and you’re a total hero. \n But try donating five kidneys, people start yelling, police gets called... \n Sheesh.",
    "Even people who are good for nothing have the capacity to bring a smile to your face, for instance when you push them down the stairs.",
    "I finally got one of those roof boxes for the car. \n It's very practical. \n I can barely hear my kids now."
]

// manage puns
var puns = [
    "I have a few jokes about unemployed people, but none of them work",
    "Light travels faster than sound. \n That's why some people appear bright until you hear them speak",
    "I was wondering why the ball was getting bigger. \n Then it hit me",
    "\"I have a split personality\" said Tom, being frank.",
    "How do you make holy water? \n You boil the hell out of it",
    "I Renamed my iPod The Titanic, so when I plug it in, it says “The Titanic is syncing.",
    "When life gives you melons, you're dyslexic",
    "Last night, I dreamed I was swimming in an ocean of orange soda. \n But it was just a Fanta sea",
    "Will glass coffins be a success? \n Remains to be seen",
    "I lost my job at the bank on my very first day. \n A woman asked me to check her balance, so I pushed her over",
    "It's hard to explain puns to kleptomaniacs because they always take things literally",
    "What’s the difference between a hippo and a zippo? \n One is really heavy and the other is a little lighter",
    "Two windmills are standing in a wind farm. \n One asks, \n “What’s your favorite kind of music?” \n The other says, \n “I’m a big metal fan.”",
    "Did you hear about the guy whose whole left side was cut off? \n He’s all right now",
    "I can’t believe I got fired from the calendar factory. \n All I did was take a day off",
    "The man who survived pepper spray and mustard gas is now a seasoned veteran",
    "My dad farted in an elevator, it was wrong on so many levels",
    "I went to the zoo the other day. \n There was only a dog in it, it was a shihtzu."
]

// manage advises
var advices = [
    "Mom always says don't play ball in the house.",
    "Always weave a little, and all the other cars will stay away from you.",
    "When you are running with scissors, point them down... \n Or just don’t run with scissors.",
    "Go ahead, what could go wrong?",
    "If you stare at something you dropped on the ground, eventually someone will pick it up for you.",
    "If you accidentally closed a browser tab, CTRL + SHIFT + T will reopen it.",
    "Drink a lot of water before consuming alcohol.",
    "How can you tell if you’re really allergic to it unless you eat some more?",
    "You don’t really need any equipment for camping.",
    "Just get really drunk before you get on the plane.",
    "Permanent markers aren’t actually permanent.",
    "Always, always, keep batteries in the freezer.",
    "It he tries to mug you just play dead. \n Or run away in a zigzag pattern.",
    "That’s only in the movies. \n No one ever actually gets caught pulling the fire alarm.",
    "Baking soda and baking powder are the same thing, this cake is going to be delicious.",
    "You don’t need an electrician for that, just do it yourself."
]

function randSentence (type) {
    var index = Math.floor(Math.random() * (type.length))
    return type[index]
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
        res: _ => "I'm Russel, the #2 bot, I'm here to amuse you! We're gonna have fun!"
    },{
        input: "/help",
        alias: [],
        desc: "Answers default question /help",
        res: _ => "I'm a chatbot! Here you can type some commands to do some stuff: \n /hello to say 'hello', \n /who to ask 'who am I', \n /advise to receive bad or good advices  \n /joke to receive a joke \n /pun to receive one of my secret puns"
    },
    // Specific commands
    {
        input: "/advise",
        alias: [],
        desc: "Gives user bad advices",
        res: _ => randSentence(advices)
    },
    {
        input: "/joke",
        alias: [],
        desc: "Telling jokes",
        res: _ => randSentence(jokes)
    },
    {
        input: "/pun",
        alias: [],
        desc: "Telling pun",
        res: _ => randSentence(puns)
    },
]


export default class Bot2 extends Member {

    constructor() {
        // human_name, id_name, commands_list, is_disabled
        super('Russel', 'bot2', commands, "https://www.flaticon.com/svg/static/icons/svg/270/270137.svg")
    }

}
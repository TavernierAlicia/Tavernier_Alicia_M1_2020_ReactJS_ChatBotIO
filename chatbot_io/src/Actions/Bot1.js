import Member from './Member.js';

// manage weather
// call api: api.openweathermap.org/data/2.5/weather?q={city name}&appid=2f5d313b3e303fd46091873333d66c31&lang=fr
function getWeather(city) {
    const request = new Request('api.openweathermap.org/data/2.5/weather?q='+city+'&appid=2f5d313b3e303fd46091873333d66c31&lang=fr')

    fetch(request)
    .then(response => {
    if (response.status === 200) {
        console.log(response.json())
        //return response.json();
    } else {
        console.log("ERROR")
    }
  })
  .then(response => {
    console.debug(response);
    // ...
  }).catch(error => {
    console.error(error);
  });
}

// manage search
function search(term) {
    window.open('http://google.com/search?q='+term)
    return "Ok."
}
// manage time

function correctMin(min) {
    if (min < 10) {
        min = "0" + min;
    }
    return min
}

function selectSentence(hour) {
    var sentence
    switch (true) {
        case (hour >= 0 && hour < 9):
            sentence = "You're up late... Or soon, I don't know."
            break
        case (hour >= 9 && hour <= 11):
            sentence = "Time for breakfast!"
            break
        case (hour > 11 && hour <= 14):
            sentence = "It's lunch time!"
            break
        case (hour > 14 && hour < 16):
            sentence = "Are you working? Because It's tea time soon!"
            break
        case (hour >= 16 && hour <= 17):
            sentence = "TEA TIME!!!"
            break
        case (hour > 17 && hour < 20):
            sentence = "Hum... What's for dinner?"
            break
        case (hour >= 20 && hour < 22):
            sentence = "Time to watch a movie, do you know \"A Serbian Film\"? Don't watch it. Seriously."
            break
        case (hour >= 22 && hour !== 0):
            sentence = "Go to sleep!"
            break
        default:
            sentence = ""
            break
    }
    return sentence
}
const commands = [
    // Common commands
    {
        input: "/hello",
        alias: [],
        desc: "Answers default question /hello",
        res: _ => "Hello " + localStorage.getItem('username') + "!"
    }, {
        input: "/who",
        alias: [],
        desc: "Answers default question /who",
        res: _ => "I'm Robert, the #1 bot, I'm here to inform you."
    }, {
        input: "/help",
        alias: [],
        desc: "Answers default question /help",
        res: _ => "/hello to say 'hello', /who to ask 'who am I' and /hour to know what time is it "
    },
    // Specific commands
    {
        input: "/time",
        alias: [],
        desc: "Give time",
        res: _ => "My watch says " + new Date().getHours() + ":" + correctMin(new Date().getMinutes()) + ". " + selectSentence(new Date().getHours())
    },
    {
        input: "/weather",
        alias: [],
        desc: "Give weather",
        res: _ => ""+getWeather("Meaux")
    },
    {
        input: "/search",
        alias: [],
        desc: "Give time",
        res: _ => "Openning google tab..." + search("boule")
    },
]


export default class Bot1 extends Member {

    constructor() {
        // human_name, id_name, commands_list, is_disabled
        super('Bot 1', 'bot1', commands);
    }

}
import Member from './Member.js'

// manage weather
// call api: api.openweathermap.org/data/2.5/weather?q={city name}&appid={apiKey}&lang=en&lang=en&units=metric
function getWeather(city) {
    city = city.substring(8).trim()
    return fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=2f5d313b3e303fd46091873333d66c31&lang=en&units=metric')
        .then(res => {
            if (res.status === 200) {
                return res
            } else {
                return Promise.reject("Sorry, I cannot give the weather of "+city+"; \n This city may not exists :(")
            }
        })
        .then(res => res.json())
        .then(info => "Position: " + info.name + " " + info.sys.country + ",  Weather: " + info.main.temp + "°C " + info.weather[0].description)
        .catch(err => err)
}

// manage search
function search(term) {
    term = term.substring(7).trim()
    window.open('http://google.com/search?q=' + term)
    return "Ok."
}
// manage time

function correctMin(min) {
    if (min < 10) {
        min = "0" + min
    }
    return min
}

// const Member = (id, mb) => mb.id === this.props.current ? (
//    <ListItem key={ id } style={Styles.member} onClick={ _ => this.changeCurrent(mb.id) }>
//        <Box component="div" style={Styles.msgInitialActive} >
//            <CardMedia style={Styles.msgImg} image={mb.pic}></CardMedia>
//        </Box>
//        <Box component="span" style={Styles.msgMemberName}>{ mb.name }</Box>
//    </ListItem>
// ) : 
//  <ListItem key={ id } style={Styles.member} onClick={ _ => this.changeCurrent(mb.id) }>
//        <Box component="div" style={Styles.msgInitial} >
//            <CardMedia style={Styles.msgImg} image={mb.pic}></CardMedia>
//        </Box>
//        <Box component="span" style={Styles.msgMemberName}>{ mb.name }</Box>
//    </ListItem>

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
        res: _ => "I'm a chatbot! Here you can type some commands to do some stuff: \n /hello to say 'hello', \n /who to ask 'who am I', \n /time to know what time is it  \n /weather with the name of your city to know the weather \n /search with a term to research with Google to open a new tab with your research"
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
        res: msg => getWeather(msg)
    },
    {
        input: "/search",
        alias: [],
        desc: "Search on Google",
        res: msg => "Openning Google tab..." + search(msg)
    },
]


export default class Bot1 extends Member {

    constructor() {
        // human_name, id_name, commands_list, is_disabled
        super('Robert', 'bot1', commands, "https://www.flaticon.com/svg/static/icons/svg/270/270140.svg")
    }

}
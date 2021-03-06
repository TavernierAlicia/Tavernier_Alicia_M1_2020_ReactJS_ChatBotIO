import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CardMedia from '@material-ui/core/CardMedia'

const   MINUTE  = 60,
        HOUR    = MINUTE * 60, 
        DAY     = HOUR * 24,
        YEAR    = DAY * 365;


export default class Chat extends React.Component {

	constructor(props) {
		super(props);
        this.state = {newMsgTxt: ""}
    }

    onChange(e) {
        this.setState({newMsgTxt: e.target.value})
    }

    chatContainer = React.createRef();

    scrollToMyRef = () => {
        const scroll = this.chatContainer.current.scrollHeight - this.chatContainer.current.clientHeight
        this.chatContainer.current.scrollTo(0, scroll)
    };

    componentDidMount = () => {

        let self = this
        setTimeout(_ => self.scrollToMyRef(), 300)
    }

    changeCurrent = conv => {
        this.props.changeConv(conv)
        let self = this
        setTimeout(_ => self.scrollToMyRef(), 300)
    }



	render() {

                
        const sendMsg = _ => {
            let content = this.state.newMsgTxt
            this.props.new(content, localStorage.getItem('username'), "", this.scrollToMyRef)
            this.setState({
                newMsgTxt: ""
            });
        }

        const onKeyPress = (e) => {
            if (e.key === 'Enter') {
                sendMsg()
            }
        }

        const Styles = {
            mainContainer: {
                width: "calc(100vw - 20px)",
                height: "calc(100vh - 20px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 0

            },
            asideContainer: {
                height: "10%",
                display: "flex",
                margin: "auto",
                alignItems: "center",
                width: "100%",
                padding: 0,
                maxWidth: "1200px",
            },
            members: {
                display: "flex",
                flexDirection: "row",
                flexGrow: "1",
                overflowX: 'scroll'
            },
            msgImg: {
                height: "100%",
                width: "100%"
            },
            msgList: {
                maxWidth: "1200px",
                height: "75%",
                margin: "auto",
                width: "100%",
                padding: 0,
                overflowY: "scroll"
            },
            msg: {
                width: "75%",
            },
            msgRight: {
                float: "right",
                textAlign: "right",
            },
            msgLeft: {
                display: "flex",
            },
            msgContent: {
                display: 'flex',
                flexDirection: 'column'
            },
            msgMoreData: {
                opacity: "0.7",
                fontSize: '0.8em'
            },
            msgDate: {
            },
            msgMemberName: {
                whiteSpace: "nowrap",
                margin: "15px",
                fontSize: 20
            },
            msgInitial: {
                width: "40px",
                minWidth: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid black",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
            },
            msgInitialActive: {
                width: "40px",
                minWidth: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "4px outset #F40057",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden"
            },
            msgBuffer: {
                margin: "15px"
            },
            newMsgContent: {
                marginRight: "15px",
                flexGrow: "1"
            },
            newMsgBtn: {
                height: "60px"
            },
            logoutBtn: {
                height: "50px",
                marginLeft: "25px"
            },
            logoutIcon: {
                marginLeft: "5px"
            }
        };

        const cleanDate = date => {
            date = new Date(date)
            const secondsAgo = Math.round((+new Date() - date) / 1000)
            if (secondsAgo < MINUTE) {
                return secondsAgo + "s"
            } else if (secondsAgo < HOUR) {
                return Math.floor(secondsAgo / MINUTE) + "m"
            } else if (secondsAgo < DAY) {
                return Math.floor(secondsAgo / HOUR) + "h"
            } else if (secondsAgo < YEAR) {
                return date.toLocaleString("default", { day: "numeric", month: "short" })
            } else {
                return date.toLocaleString("default", { year: "numeric", month: "short" })
            }
    
        }
        
        const addLineBreaks = string => {
            return string.split('\n').map((text, index) => (
              <React.Fragment key={index}>
                {text}
                <br />
              </React.Fragment>
            ));
        };

        const Message = (id, msg) => msg.is_user ? (
            <ListItem key={ id } style={{...Styles.msg, ...Styles.msgRight }} >
                <Container style={Styles.msgContent}>
                    <Box component="span" style={{...Styles.msgAuthor, ...Styles.msgMoreData}}>{ msg.author}</Box>
                    <Box component="span" style={Styles.msgBuffer}>{ addLineBreaks(msg.message) }</Box>
                    <Box component="span" style={{...Styles.msgDate, ...Styles.msgMoreData}}>{ cleanDate(msg.date) }</Box>
                </Container>
            </ListItem>
        ) : (
            <ListItem key={ id } style={{...Styles.msg, ...Styles.msgLeft}} >
                <Box component="div" style={Styles.msgInitial} >
                    <CardMedia style={Styles.msgImg} image={msg.pic}></CardMedia>
                </Box>
				<Container style={Styles.msgContent}>
                    <Box component="span" style={{...Styles.msgAuthor, ...Styles.msgMoreData}}>{ msg.author}</Box>
                    <Box component="span" style={Styles.msgBuffer}>{ addLineBreaks(msg.message) }</Box>
					<Box component="span" style={{...Styles.msgDate, ...Styles.msgMoreData}}>{ cleanDate(msg.date) }</Box>
				</Container>
			</ListItem>
        );



        const Messages = []
        for (let i = 0, j = this.props.messages.length; i < j; i++) {
            Messages.push(Message(i, this.props.messages[i]))
        }


        const Member = (id, mb) => mb.id === this.props.current ? (
            <ListItem key={ id } style={Styles.member} onClick={ _ => this.changeCurrent(mb.id) }>
                <Box component="div" style={Styles.msgInitialActive} >
                    <CardMedia style={Styles.msgImg} image={mb.pic}></CardMedia>
                </Box>
                <Box component="span" style={Styles.msgMemberName}>{ mb.name }</Box>
            </ListItem>
        ) : 
          <ListItem key={ id } style={Styles.member} onClick={ _ => this.changeCurrent(mb.id) }>
                <Box component="div" style={Styles.msgInitial} >
                    <CardMedia style={Styles.msgImg} image={mb.pic}></CardMedia>
                </Box>
                <Box component="span" style={Styles.msgMemberName}>{ mb.name }</Box>
            </ListItem>
            
        const Members = [];
        for (let i = 0, j = this.props.members.length; i < j; i++) {
            Members.push(Member(i, this.props.members[i]))
        }

        return (
            <Container style={Styles.mainContainer} >
                <Container style={{...Styles.asideContainer, ...Styles.header}}>
                    <List style={Styles.members}>
                        { Members }
                    </List>
                    <Button style={Styles.logoutBtn} onClick={_ => this.props.logout()} variant="contained" color="secondary">
                        Log-out<ExitToAppIcon fontSize="small" style={Styles.logoutIcon} />
                    </Button>
                </Container>
                <List style={Styles.msgList} ref={this.chatContainer}>
				    { Messages }
			    </List>
                <Container style={{...Styles.asideContainer, ...Styles.newMsg}}>
                    {
                        this.props.canWrite ?
                        (<TextField 
                            value={this.state.newMsgTxt} 
                            onKeyPress={e => onKeyPress(e)}
                            onChange={e => this.onChange(e)} style={Styles.newMsgContent} 
                            id="standard-basic" 
                            label="Please type here..." 
                        />) : (<TextField 
                            disabled
                            id="filled-disabled"
                            variant="filled"
                            onChange={e => this.onChange(e)} style={Styles.newMsgContent} 
                            label="You can't write in this conversation. You have been blocked by the administrator." 
                        />)
                    }
                    <Button style={Styles.newMsgBtn} onClick={_ => sendMsg()} variant="contained">
                        <SendIcon fontSize="small" />
                    </Button>
                </Container>
            </Container>
        );
    }
}
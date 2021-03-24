import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { addMessage } from './actions';

import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send'
import Button from '@material-ui/core/Button'

const   MINUTE  = 60,
        HOUR    = MINUTE * 60, 
        DAY     = HOUR * 24,
        YEAR    = DAY * 365;

const MessagesList = class MessagesList extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;
    this.state = {
      data: data,
      newMsgTxt: ""
    };

   
    this.chatContainer = React.createRef();
  }

  sendMessage(message) {
    const { dispatch } = store;
    
    if (!message) return Promise.resolve();
    const newMessage = {
      message: message,
      author: localStorage.getItem('username'),
      pic: "",
      is_user: true,
      date: new Date().toISOString()
    };
    dispatch(addMessage(this.props.robotId, newMessage));

    return Promise.resolve(this.props.member.getCommand(message)).then(res => {
      if (!res) return;
      const resMessage = {
        message: res,
        author: this.props.member.getName(),
        pic: this.props.member.getPic(),
        is_user: false,
        date: new Date().toISOString()
      }
      dispatch(addMessage(this.props.robotId, resMessage));

    });


  }


  onChange(e) {
    this.setState({data:this.state.data, newMsgTxt: e.target.value})
  }

  componentDidMount = () => {

    let self = this
    setTimeout(_ => self.scrollToMyRef(), 300)
  }



  scrollToMyRef = () => {
    const scroll = this.chatContainer.current.scrollHeight - this.chatContainer.current.clientHeight
    this.chatContainer.current.scrollTo(0, scroll)
  };

  render() {
    if (this.props.robotId === 'admin' && !this.props.data[this.props.robotId].messageList.length) {
      this.sendMessage("Hello?").then(_ => this.sendMessage("What is that?")).then(_ => this.sendMessage("What can I do on this interface?")).then(_ => this.sendMessage('help?')).then(_ => this.scrollToMyRef());
    }

    this.componentDidMount()

    const sendMsg = _ => {
      let content = this.state.newMsgTxt
      this.sendMessage(content).then(_ => this.scrollToMyRef());
      this.setState({
          newMsgTxt: "",
          data: this.state
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
      },
      blockDiv: {

        display: "flex",
        flexDirection: "column",
        height: "92%"

      }
    };


    const addLineBreaks = string => {
      if (!string) return "";
      return string.split('\n').map((text, index) => (
        <React.Fragment key={index}>
          {text}
          <br />
        </React.Fragment>
      ));
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

    const Message = (id, msg) => msg.is_user ? (
      <ListItem key={id} style={{ ...Styles.msg, ...Styles.msgRight }} >
        <Container style={Styles.msgContent}>
          <Box component="span" style={{ ...Styles.msgAuthor, ...Styles.msgMoreData }}>{msg.author}</Box>
          <Box component="span" style={Styles.msgBuffer}>{addLineBreaks(msg.message)}</Box>
          <Box component="span" style={{ ...Styles.msgDate, ...Styles.msgMoreData }}>{cleanDate(msg.date)}</Box>
        </Container>
      </ListItem>
    ) : (
      <ListItem key={id} style={{ ...Styles.msg, ...Styles.msgLeft }} >
        <Box component="div" style={Styles.msgInitial} >
          <CardMedia style={Styles.msgImg} image={msg.pic}></CardMedia>
        </Box>
        <Container style={Styles.msgContent}>
          <Box component="span" style={{ ...Styles.msgAuthor, ...Styles.msgMoreData }}>{msg.author}</Box>
          <Box component="span" style={Styles.msgBuffer}>{addLineBreaks(msg.message)}</Box>
          <Box component="span" style={{ ...Styles.msgDate, ...Styles.msgMoreData }}>{cleanDate(msg.date)}</Box>
        </Container>
      </ListItem>
    );



    const Messages = []
    for (let i = 0, j = this.props.data[this.props.robotId].messageList.length; i < j; i++) {
      Messages.push(Message(i, this.props.data[this.props.robotId].messageList[i]))
    }




    return (
      <Box component="div" style={Styles.blockDiv}>
          <List style={Styles.msgList} ref={this.chatContainer} >{Messages}</List>
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
    </Box>
    )
  }


};

const mapToProps = (state) => {
  return {
    data: state.messagesList
  }
};

export default connect(mapToProps)(MessagesList);
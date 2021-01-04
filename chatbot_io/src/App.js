import React from 'react'
import Admin from './Actions/Admin'
import Bot1 from './Actions/Bot1'
import Bot2 from './Actions/Bot2'
import Bot3 from './Actions/Bot3'
import Chat from './Components/Chat'
import Login from './Components/Login'

const defaultMembers = [new Admin(), new Bot1(), new Bot2(), new Bot3()]

export default class App extends React.Component {

  state = { name: null, messages: [], current: null }

  logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('messages')
    this.setState({ name: null, messages: {}, current: null })
  }

  changeConv(newConv) {
    localStorage.setItem('current', newConv)
    this.setState({ name: this.state.name, messages: this.state.messages, current: newConv })
  }

  sendMsg(content, user, pic="", callback = _ => { }) {
    if (!content || !user) return
    let updateMessages = this.state.messages
    if (!updateMessages[this.state.current]) updateMessages[this.state.current] = []
    updateMessages[this.state.current].push({
      message: content,
      author: user,
      pic: pic,
      is_user: user === this.state.name,
      date: new Date().toISOString()
    });

    let realCallback = callback
    let messageSent = false
    let self = this
    function sendMessage() {
      self.setState(
        {
          name: self.state.name || null,
          messages: updateMessages,
          current: self.state.current || null
        }, _ => realCallback()
      );

      localStorage.setItem('messages', JSON.stringify(updateMessages))
    }
    if (user === this.state.name) {
      let conv = defaultMembers.find(m => m.getId() === this.state.current)
      if (conv) {
        let sentence = new Promise(resolve => resolve(conv.getCommand(content)))
        messageSent = true
        sentence.then(response => {
          if (response) {
            realCallback = _ => this.sendMsg(response, conv.getName(), conv.getPic(), callback)
          }
          sendMessage()
        })
        //let response = conv.getCommand(content);
      }
    }
    if (!messageSent) sendMessage()
    // if (!realCallback) realCallback = callback;
  }

  login() {
    let username = localStorage.getItem('username') || null;
    localStorage.setItem('current', 'admin')
    this.setState({
      name: username,
      messages: {},
      current: 'admin'
    }, _ => this.setLoginMsg(username));
  }

  setLoginMsg(username) {
    this.sendMsg("Hello?", username, "",  _ => {
      return this.sendMsg("What is that?", username, "", _ => {
        return this.sendMsg("What can I do on this interface?", username, "", _ => {
          return this.sendMsg("help?", username, "", _ => this.forceUpdate());
        });
      });
    });
  }

  changeMember(conv) {
    localStorage.setItem('current', conv)
    this.setState(
      {
        name: this.state.name,
        messages: this.state.messages,
        current: conv
      },
      _ => this.forceUpdate()
    );

  }

  componentDidMount() {
    this.setState(
      {
        name: localStorage.getItem('username') || null,
        messages: JSON.parse(localStorage.getItem('messages') || "{}"),
        current: localStorage.getItem('current') || null
      }
    );
  }



  render() {

    let canWrite = _ => {
      let member = defaultMembers.find(m => m.getId() === this.state.current)
      return member ? member.canWrite() : false
    };


    return this.state.name != null ? (
      <Chat canWrite={canWrite()} messages={this.state.messages[this.state.current] || []} new={(c, u, p, ck) => this.sendMsg(c, u, p, ck)} members={defaultMembers} changeConv={c => this.changeMember(c)} logout={_ => this.logout()}>
      </Chat>
    ) : (
        <Login setLogin={_ => this.login()}>
        </Login>
      )
      ;
  }
}


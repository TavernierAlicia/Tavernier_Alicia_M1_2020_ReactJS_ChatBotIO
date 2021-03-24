import React from 'react'
import Admin from './Actions/Admin'
import Bot1 from './Actions/Bot1'
import Bot2 from './Actions/Bot2'
import Bot3 from './Actions/Bot3'
import Chat from './Components/Chat'
import Login from './Components/Login'

import { Provider } from 'react-redux';

// Functions
import store from './store';

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
        current: conv
      },
      _ => this.forceUpdate()
    );

  }

  componentDidMount() {
    this.setState(
      {
        name: localStorage.getItem('username') || null,
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
      <Provider store={store}>
        <Chat canWrite={canWrite()} members={defaultMembers} changeConv={c => this.changeMember(c)} logout={_ => this.logout()} current={this.state.current} member={defaultMembers.find(m => m.getId() === this.state.current)}>
        </Chat>
      </Provider>
    ) : (
        <Login setLogin={_ => this.login()}>
        </Login>
      );
  }
}


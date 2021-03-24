import { actionsType } from './actions';

const initialState = {
  admin: {
    messageList: []
  },
  bot1: {
    messageList: []
  },
  bot2: {
    messageList: []
  },
  bot3: {
    messageList: []
  }
}


// [
//   {
//     robotId: 'admin',
//     messagesList: []
//   },
//   {
//     robotId: 'bot1',
//     messagesList: []
//   },
//   {
//     robotId: 'bot2',
//     messagesList: []
//   },
//   {
//     robotId: 'bot3',
//     messagesList: []
//   },
// ];

const addMessage = (state, action) => {
  const stateUpdated = Object.assign({}, state);

  stateUpdated[action.idRobot].messageList.push(action.message);

  return stateUpdated;
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_MESSAGE:
      return addMessage(state, action);
    default:
      return state;
  }
};

export default data;
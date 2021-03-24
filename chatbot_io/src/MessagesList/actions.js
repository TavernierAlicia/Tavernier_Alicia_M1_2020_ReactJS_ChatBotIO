export const actionsType = {
  ADD_MESSAGE: 'ADD_MESSAGE'
};

export const addMessage = (idRobot, message) => ({
  type: actionsType.ADD_MESSAGE,
  idRobot: idRobot,
  message: message
});

const getSnackMessage = (showMessage, message) => {
  const newSnackMessage = {};
  newSnackMessage.showMessage = showMessage;
  newSnackMessage.message = message;
  return newSnackMessage;
};

export default {
  getSnackMessage,
};

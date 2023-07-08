export const handler = async (message: string): Promise<string> => {
  try {
    const jsonMessage = JSON.parse(message);
    let response = message;
    switch (jsonMessage.type) {
      case 'reg':
        response = jsonMessage;
        break;
      default:
        // TODO handle error when type does not exist
        return message;
    }
    return JSON.stringify(response);
  } catch (error) {
    console.log('Ошибка', error);
  }
};

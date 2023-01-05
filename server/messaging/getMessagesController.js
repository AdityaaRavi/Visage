const getMessagesController = (req, res) => {
    const userId = req.query.userId;
    const otherPersonId = req.query.otherPersonId;
    //console.log(req.query);
    let toSend = {
      messages:[
          {sender: userId, message: 'Hey!'},
          {sender: otherPersonId, message: 'Hi!, How are you?'},
          {sender: userId, message: 'I am good!'},
          {sender: otherPersonId, message: 'That is great!'},
          {sender: userId, message: 'How about you?'},
          {sender: otherPersonId, message: 'I am good too!'},
          {sender: userId, message: 'That is great!'},
          {sender: otherPersonId, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
          {sender: userId, message: '1'},
          {sender: otherPersonId, message: '2'},
          {sender: userId, message: '3'},
          {sender: otherPersonId, message: '4'},
          {sender: userId, message: '5'},
          {sender: otherPersonId, message: '6'},
          {sender: userId, message: '7'},
          {sender: otherPersonId, message: '8'},
          {sender: userId, message: '9'},
          {sender: otherPersonId, message: '10'},
      ],
      OtherPersonName: 'John Doe',
    };
    //console.log(toSend);
  
    res.json(toSend);
};

export default getMessagesController;
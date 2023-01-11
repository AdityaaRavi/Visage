const sendMessageController = (req, res, mysqlConnection) => {
    const senderId = req.body.userId;
    const recepientId = req.body.otherPersonId;
    const message = req.body.message;
    
  
    try{
      // Insert message into database
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
      
      mysqlConnection.query('SELECT message_ID FROM messages;', (err, lis) => {
        if (err) throw err;
        // Makes sure message_ID is unique. This does employ a full table scan though, which is not ideal at scale. This shouldn't cause any problems
        //// in this application though.
        let message_ID = Math.floor(Math.random() * 2147483647);
        while(lis.includes(message_ID)) message_ID = Math.floor(Math.random() * 2147483647);
      
        mysqlConnection.query('INSERT INTO messages (sender_userID, recipient_userID, message, message_ID) ' +
                              'VALUES (?, ?, ?, ?);', [senderId, recepientId, message, message_ID], (err, result) => {
          if (err) throw err;
          res.json({
            message: `Message sent successfully! from ${senderId} to ${recepientId}`
          });
        });
      });

    } catch (err) {
      console.log(err);
      res.json(err);
    }
};

export default sendMessageController;
import createSuggestionsHelper from '../connections/createSuggestionsHelper.js';

const sendMessageController = (req, res, mysqlConnection) => {
    const senderId = req.body.userId;
    const recepientId = req.body.otherPersonId;
    const message = req.body.message;
    
  
    try{
      // Insert message into database
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});

      // check if the recepient is a connection
      mysqlConnection.query('SELECT * FROM connections WHERE (lower_userID=? AND higher_userID=?) OR (lower_userID=? AND higher_userID=?);', [senderId, recepientId, recepientId, senderId], (err, result) => {
        if (err) throw err;
        // if the recepient is not a connection,
        if (result.length == 0) {
          // create a connection
          mysqlConnection.query('SELECT connection_ID FROM connections;', (err, lis) => {
            if (err) throw err;
            // Makes sure connection_ID is unique. This does employ a full table scan though, which is not ideal at scale. This shouldn't cause any problems
            //// in this application though.
            let connectionId = Math.floor(Math.random() * 2147483647);
            while(lis.includes(connectionId)) connectionId = Math.floor(Math.random() * 2147483647);

            mysqlConnection.query('INSERT INTO connections (connection_ID, lower_userID, higher_userID) VALUES (?, ?, ?);', [connectionId, senderId > recepientId ? recepientId : senderId, senderId < recepientId ? recepientId : senderId], async (err, result) => {
              if (err) throw err;
              // and change the suggested connection status to not pending
              mysqlConnection.query('UPDATE suggested_connections SET pending=false, accepted=true WHERE (lower_userID=? AND higher_userID=?) OR (lower_userID=? AND higher_userID=?);', [senderId, recepientId, recepientId, senderId], (err, result) => {
                if (err) throw err;
              });
              // and also change the number of connections field for both the users
              mysqlConnection.query('UPDATE user_info SET num_connections=num_connections+1 WHERE userID=? OR userID=?;', [senderId, recepientId],  (err, result) => {if (err) throw err;});
              // add a new connection suggestion
              await createSuggestionsHelper(1, senderId, res, mysqlConnection);
            });
          });
        }
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
      });

    } catch (err) {
      console.log(err);
      res.json(err);
    }
};

export default sendMessageController;
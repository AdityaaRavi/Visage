const getMessagesController = (req, res, mysqlConnection) => {
    const userId = req.query.userId;
    const otherPersonId = req.query.otherPersonId;
    try{
        mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
        mysqlConnection.query('SELECT * FROM messages WHERE (sender_userID=? AND recipient_userID=?) OR (sender_userID=? AND recipient_userID=?) ORDER BY message_sent_time ASC;', [userId, otherPersonId, otherPersonId, userId], (err, result) => {
          if (err) throw err;
          mysqlConnection.query('SELECT name FROM user_login WHERE userId=?;', [otherPersonId], (err, result2) => {
            if (err) throw err;
            try{
              res.json({
                messages: result,
                OtherPersonName: result2[0].name,
              });
            } catch (err) {
              res.json({
                messages: result,
                OtherPersonName: "Whoa! This person doesn't exist!",
              });
            }
          });
      });
    } catch (err) {
      res.json(err);
    }
};

export default getMessagesController;
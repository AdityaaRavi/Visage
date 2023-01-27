const declineSuggestionController = (req, res, mysqlConnection) => {
  const sessionId = req.body.userId;
  const otherPersonTempId = req.body.otherPersonId;
    
  try{
    mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
    // Remove connection
    // go from sessionId to userId
    mysqlConnection.query('SELECT userID FROM users WHERE sessionID=?;', [sessionId], (err, result) => {
      mysqlConnection.query('SELECT userID FROM users WHERE sessionID=?;', [otherPersonTempId], (err, result2) => {

        mysqlConnection.query('UPDATE suggested_connections SET pending=false WHERE (lower_userID=? AND higher_userID=?) OR (lower_userID=? AND higher_userID=?);', [result[0].userID, result2[0].userID, result2[0].userID, result[0].userID,], (err, result) => {
          if (err) throw err;
          res.json({
            message: `Connection suggestion declined successfully!`
          });
        });
      });
    });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

export default declineSuggestionController;
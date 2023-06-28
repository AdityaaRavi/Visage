import createSuggestionsHelper from './createSuggestionsHelper.js';

const declineSuggestionController = (req, res, mysqlConnection) => {
  const userId = req.body.userId;
  const otherPersonId = req.body.otherPersonId;
    
  try{
    mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
    // Remove connection
    mysqlConnection.query('UPDATE suggested_connections SET pending=false WHERE (lower_userID=? AND higher_userID=?) OR (lower_userID=? AND higher_userID=?);', [userId, otherPersonId, otherPersonId, userId], (err, result) => {
      if (err) throw err;
      // add a new connection suggestion
      createSuggestionsHelper(1, userId, res, mysqlConnection);
      res.json({
        message: `Connection suggestion declined successfully!`
      });
    });
    
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

export default declineSuggestionController;
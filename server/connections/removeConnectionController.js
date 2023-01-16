const removeConnectionController = (req, res, mysqlConnection) => {
    const userId = req.body.userId;
    const otherPersonId = req.body.otherPersonId;
      
    try{
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
      // Remove connection
      mysqlConnection.query('DELETE FROM connections WHERE (lower_userID=? AND higher_userID=?) OR (lower_userID=? AND higher_userID=?);', [userId, otherPersonId, otherPersonId, userId], (err, result) => {
        if (err) throw err;
        res.json({
          message: `Connection removed successfully!`
        });
      });
      
    } catch (err) {
      res.json(err);
      console.log(err);
    }
};

export default removeConnectionController;
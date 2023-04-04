const getEmailController = (req, res, mysqlConnection) => {
    const userId = req.query.userId;
    //console.log(`User ID: ${userId}`);
    if(userId < 0) res.json({err: `Invalid user ID: ${userId}`} );
    try{
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
      
      mysqlConnection.query('SELECT * FROM user_login WHERE userId = ?;', [userId], (err, result) => {
        if (err) throw err;
        res.json({
          id: userId,
          name: result[0].name,
          email: result[0].email,
        });
      });
      
  } catch (err) {
    res.json(err);
    console.log(err);
  }
    
};

export default getEmailController;
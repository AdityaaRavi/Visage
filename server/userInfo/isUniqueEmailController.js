const isUniqueEmailController = (req, res, mysqlConnection) => {
    const email = req.query.email;
    //console.log(`User ID: ${userId}`);
    try{
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
      
      mysqlConnection.query('SELECT * FROM user_login WHERE email = ?;', [email], (err, result) => {
        if (err) throw err;
        if (result.length == 0) res.send("is_new");
        else res.send("is_not_new");
      });
      
  } catch (err) {
    res.json(err);
    console.log(err);
  }
    
};

export default isUniqueEmailController;
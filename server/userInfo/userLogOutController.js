const userLogoutController = (req, res, mysqlConnection) => {
    const session = req.body.session;
    
    
    try{
        // Create user
        mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
        // remove the session from the database
        mysqlConnection.query('DELETE FROM sessionsTable WHERE sessionId = ?;', [session], (err, result) => {
            if (err) throw err;
            res.json({message: "Logout successful!"});
        });
    
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};

export default userLogoutController;

/*
Example JSON body:
{
    "session": "123456789",
} 
*/
const userLoginController = (req, res, mysqlConnection) => {
    const email = req.body.email;
    const password = req.body.password;
    
    
    try{
      // Create user
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});

      mysqlConnection.query("SELECT userId FROM user_login WHERE email = ?;", (email), (err, lis) => {
        if(err) throw err;
        lis = lis.filter((user) => user.password == password);
        if(lis.length === 0) res.json({error: "Email or password is incorrect!"});
        else{
          res.json({message: "success", userId: lis[0].userId});

          // // create a sessionId for the user and store it in the database
        // // return the sessionId to the user
        // mysqlConnection.query('SELECT sessionId FROM sessionsTable;', (err, lis2) => {
        //   if (err) throw err;
        //   // Makes sure sessionId is unique. This does employ a full table scan though, which is not ideal at scale. This shouldn't cause any problems
        //   //// in this application though.
        //   let sessionId = Math.floor(Math.random() * 2147483647);
        //   while(lis2.includes(sessionId)) sessionId = Math.floor(Math.random() * 2147483647);
        //   mysqlConnection.query('INSERT INTO sessionsTable (sessionId, userId) VALUES (?, ?);', [sessionId, lis[0].userId], (err, result) => {
        //     if (err) throw err;
        //     res.json({message: "Login successful!", sessionId: sessionId });
        //   });
        // });
        }
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};

export default userLoginController;

/*
Example JSON body:
{
    "email": "test2@gmail.com",
    "password": "pwd",
} 
*/
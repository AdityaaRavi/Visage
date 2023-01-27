const getExistingConnectionsController = (req, res, mysqlConnection) => {

  const sessionId = req.query.userId;

  // 

  try{
    mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
    // go from session id to user id
    mysqlConnection.query('SELECT userId FROM sessions WHERE sessionId=?;', [sessionId], (err, result) => {
      if (err) throw err;
      let userId = result[0].userId;
      mysqlConnection.query('SELECT * FROM connections WHERE lower_userID=? OR higher_userID=? ORDER BY time_of_connection DESC;', [userId, userId], (err, result) => {
        if (err) throw err;
        let connections = result.map((connection) => connection.lower_userID == userId ? connection.higher_userID : connection.lower_userID);
        let connectionsString = connections.join(' OR userId = ');

        mysqlConnection.query(`SELECT * FROM user_info WHERE userId = ${connectionsString};`, (err, result) => {
          if (err) throw err;
          let connectionsInfo = result.map((result) => {return {
            id: result.userId,
            name: result.name,
            orgs: [result.org1, result.org2, result.org3, result.org4],
            schools: [result.school1, result.school2, result.school3],
            career: [result.career1, result.career2, result.career3],
            fun: [result.fun1, result.fun2, result.fun3],
            description: result.description
          }});
          createAndSendTempId(connectionsInfo);
          res.json(connectionsInfo);
        });
      });
    });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
  
};

export default getExistingConnectionsController;
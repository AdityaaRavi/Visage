function userStatsController(req, res, mysqlConnection) {

  const userId = req.query.userId;

  try{
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
      mysqlConnection.query('SELECT num_connections, top_skill1, top_skill2, top_skill3, top_skill4 ' + 
                            'FROM user_info WHERE userId=?;', [userId], (err, result) => {
        if (err) throw err;
        res.json({
          numConnections: result[0].num_connections,
          top4Skills: [result[0].top_skill1, result[0].top_skill2, result[0].top_skill3, result[0].top_skill4]
        });
      });
  } catch (err) {
    res.json(err);
  }
    
    
}

export default userStatsController;
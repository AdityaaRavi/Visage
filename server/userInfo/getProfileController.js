const getProfileController = (req, res, mysqlConnection) => {
    const userId = req.query.userId;
    try{
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
      
      mysqlConnection.query('SELECT * FROM user_info WHERE userId = ?;', [userId], (err, result) => {
        if (err) throw err;
        res.json({
          id: userId,
          name: result[0].name,
          orgs: [result[0].org1, result[0].org2, result[0].org3, result[0].org4],
          schools: [result[0].school1, result[0].school2, result[0].school3],
          career: [result[0].career1, result[0].career2, result[0].career3],
          fun: [result[0].fun1, result[0].fun2, result[0].fun3],
          description: result[0].description
        });
      });
      
  } catch (err) {
    res.json(err);
  }
    
};

export default getProfileController;
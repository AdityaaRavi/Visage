const updateProfileController = (req, res, mysqlConnection) => {
  const name = req.body.name;
  // const email = req.body.email;
  // password = req.body.password;
  let userId = req.body.userId;
  
  let topSkills = req.body.top4Skills.map((x) => x.toLowerCase().trim());
  
  let orgs = req.body.orgs.map((x) => x.toLowerCase().trim());
  if (orgs.length < 4) for (let i = orgs.length; i < 4; i++) orgs.push(null);
  
  let schools = req.body.schools.map((x) => x.toLowerCase().trim());
  if (schools.length < 3) for (let i = schools.length; i < 3; i++) schools.push(null);
  
  let career = req.body.career.map((x) => x.toLowerCase().trim());
  if (career.length < 3) for (let i = career.length; i < 3; i++) career.push(null);
  
  let fun = req.body.fun.map((x) => x.toLowerCase().trim());
  if (fun.length < 3) for (let i = fun.length; i < 3; i++) fun.push(null);
  
  const description = req.body.description;
  
  try{
    // Create user
    mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
    mysqlConnection.query('UPDATE user_login SET name=?' +
                          'WHERE userId=?;', [name, userId], (err, result) => {
      if (err) throw err;
      
      const param = [name, 
        topSkills[0], topSkills[1], topSkills[2], topSkills[3],
        orgs[0], orgs[1], orgs[2], orgs[3],
        schools[0], schools[1], schools[2],
        career[0], career[1], career[2],
        fun[0], fun[1], fun[2],
        description, userId]
      
      mysqlConnection.query('UPDATE user_info '+
                            'SET name=?, top_skill1=?, top_skill2=?, top_skill3=?, top_skill4=?, org1=?, org2=?, org3=?, org4=?, school1=?, school2=?, school3=?, career1=?, career2=?, career3=?, fun1=?, fun2=?, fun3=?, description=? ' +
                            'WHERE userId=?;'
                          , param, (err, result2) => {
        if (err) throw err;
        res.send('success');
      });
    });

  } catch (err) {
    console.log(err);
    res.json(err);
  }

};

export default updateProfileController;
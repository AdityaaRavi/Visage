const createUserController = (req, res, mysqlConnection) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let userId = Math.floor(Math.random() * 2147483647);
    
    let topSkills = req.body.topSkills;
    
    let orgs = req.body.orgs;
    if (orgs.length < 4) for (let i = orgs.length; i < 4; i++) orgs.push(null);
    
    let schools = req.body.schools;
    if (schools.length < 3) for (let i = schools.length; i < 3; i++) schools.push(null);
    
    let career = req.body.career;
    if (career.length < 3) for (let i = career.length; i < 3; i++) career.push(null);
    
    let fun = req.body.fun;
    if (fun.length < 3) for (let i = fun.length; i < 3; i++) fun.push(null);
    
    const description = req.body.description;
    
    try{
      // Create user
      mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});

      mysqlConnection.query('SELECT name FROM user_login WHERE userId = ?;', [userId], (err, lis) => {
        if (err) throw err;
        if (lis.length > 0) userId = Math.floor(Math.random() * 2147483647);

        mysqlConnection.query('SELECT name FROM user_login WHERE email = ?;', [email], (err, lis) => {
          if (err) throw err;
          if (lis.length > 0) res.json({error: "Email already Used!"});
        
        mysqlConnection.query('INSERT INTO user_login (userId, name, email, password) ' +
                              'VALUES (?, ?, ?, ?);', [userId, name, email, password], (err, result) => {
          if (err) throw err;
          
          const param = [userId, name, 
            topSkills[0], topSkills[1], topSkills[2], topSkills[3],
            orgs[0], orgs[1], orgs[2], orgs[3],
            schools[0], schools[1], schools[2],
            career[0], career[1], career[2],
            fun[0], fun[1], fun[2],
            description]
          
          mysqlConnection.query('INSERT INTO user_info (userId, name, top_skill1, top_skill2, top_skill3, top_skill4, org1, org2, org3, org4, school1, school2, school3, career1, career2, career3, fun1, fun2, fun3, description) ' +
                              'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
                              , param, (err, result2) => {
            if (err) throw err;
            res.json({
              message: `User created successfully!\nName: ${name}, userId: ${userId}`,
              userId: userId
            });
          });
        });
      });
    });

    } catch (err) {
      console.log(err);
      res.json(err);
    }
};

export default createUserController;

/*
Example JSON body:
{
    "name": "Testing",
    "email": "test2@gmail.com",
    "password": "pwd",
    "topSkills": ["Node.js", "TensorFlow", "PyTorch", "communication"],
    "orgs": ["SacHacks", "GDSC"],
    "schools": ["UCD"],
    "career": ["Machine Learning"],
    "fun": ["Biking", "Dancing", "Singing"],
    "description": "Open to connect and chat!"
} 
*/
const createUserController = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userId = math.random();
    
    try{
      // Create user
      res.json({
        message: `User created successfully!\nName: ${name}, userId: ${userId}`,
        userId: userId
      });
    } catch (err) {
      res.json(err);
    }
};

export default createUserController;
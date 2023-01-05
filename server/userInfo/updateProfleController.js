const updateProfileController = (req, res) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const email = req.body.email;
    const orgs = req.body.orgs;
    const schools = req.body.schools;
    const career = req.body.career;
    const fun = req.body.fun;
    const description = req.body.description;
  
    try{
      // Update user
      res.json({
        message: `User updated successfully!\nName: ${name}, userId: ${userId}`,
        userId: userId
      });
    } catch (err) {
      res.json(err);
    }
};

export default updateProfileController;
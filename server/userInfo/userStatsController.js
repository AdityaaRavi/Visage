function userStatsController(req, res) {

    const userId = req.query.userId;
    
    res.json({
      numConnections: 52,
      top4Skills: ["React.js", "Tensorflow", "Java", "Leadership"],
    });
}

export default userStatsController;
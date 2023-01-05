const declineSuggestionController = (req, res) => {
    const userId = req.body.userId;
    const otherPersonId = req.body.otherPersonId;
  
    try{
      // Remove connection
      res.json({
        message: `Connection suggestion declined successfully! from ${userId} to ${otherPersonId}`
      });
    } catch (err) {
      res.json(err);
    }
};

export default declineSuggestionController;
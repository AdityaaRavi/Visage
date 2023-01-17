///////////// Depricated
const acceptSuggestionController = (req, res) => {
    const userId = req.body.userId;
    const otherPersonId = req.body.otherPersonId;
  
    try{
      // accept connection
      res.json({
        message: `Connection accepted successfully! from ${userId} to ${otherPersonId}`
      });
    }
    catch (err) {
      res.json(err);
    }
};

export default acceptSuggestionController;
const sendMessageController = (req, res) => {
    const senderId = req.body.userId;
    const recepientId = req.body.otherPersonId;
    const message = req.body.message;
  
    try{
      // Insert message into database
      res.json({
        message: `Message sent successfully! from ${senderId} to ${recepientId}`
      });
    } catch (err) {
      res.json(err);
    }
};

export default sendMessageController;
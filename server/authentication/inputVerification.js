const verifyInputAndRun = (req, res, method, mysqlConnection) => {
    // userId is the ID of the user whose info we are trying to access
    let userId = req.query.userId;
    let session = req.query.session;
    // myId is the ID of the user who is trying to access the info. 
    // This is the ID that must be used for access control.
    let myId = req.query.myId;
    // In the case of a POST request, the userId, myId, and session are passed in the body
    if(myId === undefined) {
        myId = req.body.myId;
        userId = req.body.userId;
        session = req.body.session;
    }
    console.log("session: " + session + " myId: " + myId + " userId: " + userId);
    // server-wide input validation
    if ((req.body === {} && req.query === {}) || userId === undefined || myId === undefined || session === undefined) {
        res.send("invalid_input");
        console.log("invalid_input");
    }else{
        method(req, res, mysqlConnection);
    }

}

export default verifyInputAndRun;
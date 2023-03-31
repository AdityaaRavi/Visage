import verifyInputAndRun from "./inputVerification.js";

const runIfLoggedIn = (req, res, method, mysqlConnection) => {
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
    if ((req.body === {} && req.query === {}) || userId == null || myId == null || session == null) {
        res.send("invalid_input");
        console.log("invalid_input");
        return;
    }

    try{
        mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
        // Check if session is valid
        mysqlConnection.query('SELECT * FROM sessionsTable WHERE sessionId=?;', [session], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                // if the user is logged in, call the method that was passed in
                verifyInputAndRun(req, res, method, mysqlConnection);
            } else {
                // if the user is not logged in, send a message to the frontend asking
                // it to forget all the current login information and redirect to the login page
                res.send("no_session_found");
            }
        });
    } catch (err) {
        // res.json(err);
        console.log(err);
    }
    //}
  };
  
  export default runIfLoggedIn;
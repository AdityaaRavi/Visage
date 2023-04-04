// If the old password is correct, update the password to the new password, and the email to the new email
const updateLoginController = (req, res, mysqlConnection) => {
    const userId = req.body.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const newEmail = req.body.email;

    if(userId < 0) res.json({err: `Invalid user ID: ${userId}`} );
    try{
        mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
        
        mysqlConnection.query('SELECT * FROM user_login WHERE userId = ?;', [userId], (err, result) => {
        if (err) throw err;
        if(result[0].password === oldPassword){
            mysqlConnection.query('UPDATE user_login SET email = ? WHERE userId = ?;', [newEmail, userId], (err, result) => {
                if (err) throw err;
                // the new password is not empty, change the password
                if (newPassword.length > 0) {
                    mysqlConnection.query('UPDATE user_login SET password = ? WHERE userId = ?;', [newPassword, userId], (err, result) => {
                        if (err) throw err;
                        res.send("success");
                    });
                } else res.send("success");
            });
        }
        else{
            // If the old password is incorrect, force the user to log in again
            // remove the session from the database
            mysqlConnection.query('DELETE FROM sessionsTable WHERE userId = ?;', [userId], (err, result) => {
                if (err) throw err;
            });
            res.send("no_session_found");
        }
        });
        
    } catch (err) {
    res.json(err);
    console.log(err);
    }
    
};

export default updateLoginController;
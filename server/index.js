// imports
import express from "express";
// controllers
import userStatsController from "./userInfo/userStatsController.js";
import getProfileController from "./userInfo/getProfileController.js";
import createUserController from "./userInfo/createUserController.js";
import updateProfileController from "./userInfo/updateProfleController.js";
import getMessagesController from "./messaging/getMessagesController.js";
import sendMessageController from "./messaging/sendMessagesController.js";
import getExistingConnectionsController from "./connections/getExistingConnectionsController.js";
import getSuggestedConnectionsController from "./connections/getSuggestedConnectionsController.js";
import removeConnectionController from "./connections/removeConnectionController.js";
import declineSuggestionController from "./connections/declineSuggestionController.js";
import acceptSuggestionController from "./connections/acceptSuggestionController.js";


const PORT = process.env.PORT || 3001;

const app = express();

// This will add the body of a POST request to the req.body object
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});
////////////////////////////////// User info //////////////////////////////////

// GET request for user stats
app.get("/userStats/", userStatsController);

// GET request to get a user's profile
app.get('/getProfile/', getProfileController);

// POST request to create a user account --- NOT YET IMPLEMENTED ON THE FRONTEND
app.post('/createUser', createUserController);

// POST request to update a user's profile --- NOT YET IMPLEMENTED ON THE FRONTEND
app.post('/updateProfile', updateProfileController);

////////////////////////////////// Messaging //////////////////////////////////
// GET request for all the messages between two users
app.get("/getMessages/", getMessagesController); 

// POST request to send a message to a user
app.post('/sendMessage/', sendMessageController);

////////////////////////////////// Connections //////////////////////////////////
// GET request for all the connections of a user
app.get("/getExistingConnections/", getExistingConnectionsController);

// GET request to the connection suggestions created by us for the user
app.get('/getSuggestedConnections/', getSuggestedConnectionsController);

// POST request to remove a connection
app.post('/removeConnection/', removeConnectionController);

// POST request to decline a suggested connection
app.post('/declineSuggestion/', declineSuggestionController);

// POST request to accept a suggested connection
/// Might not need an endpoint for this... If a person sends a message, the other person should automatically be considered a connection.
app.post('/acceptSuggestion/', acceptSuggestionController);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
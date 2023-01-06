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

import mysql from 'mysql2';

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    // password: '',
});
connection.connect((err) => {if (err) throw err});

const PORT = process.env.PORT || 3001;

const app = express();

// This will add the body of a POST request to the req.body object
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});
////////////////////////////////// User info //////////////////////////////////

// GET request for user stats
app.get("/userStats/", (req, res) => userStatsController(req, res, connection));

// GET request to get a user's profile
app.get('/getProfile/', (req, res) =>  getProfileController(req, res, connection));

// POST request to create a user account --- NOT YET IMPLEMENTED ON THE FRONTEND
app.post('/createUser', (req, res) => createUserController(req, res, connection));

// POST request to update a user's profile --- NOT YET IMPLEMENTED ON THE FRONTEND
app.post('/updateProfile', (req, res) => updateProfileController(req, res, connection));

////////////////////////////////// Messaging //////////////////////////////////
// GET request for all the messages between two users
app.get("/getMessages/", (req, res) => getMessagesController(req, res, connection)); 

// POST request to send a message to a user
app.post('/sendMessage/',(req, res) =>  sendMessageController(req, res, connection));

////////////////////////////////// Connections //////////////////////////////////
// GET request for all the connections of a user
app.get("/getExistingConnections/", (req, res) =>  getExistingConnectionsController(req, res, connection));

// GET request to the connection suggestions created by us for the user
app.get('/getSuggestedConnections/', (req, res) =>  getSuggestedConnectionsController(req, res, connection));

// POST request to remove a connection
app.post('/removeConnection/',(req, res) => removeConnectionController(req, res, connection));

// POST request to decline a suggested connection
app.post('/declineSuggestion/',(req, res) => declineSuggestionController(req, res, connection));

// POST request to accept a suggested connection
/// Might not need an endpoint for this... If a person sends a message, the other person should automatically be considered a connection.
app.post('/acceptSuggestion/', (req, res) => acceptSuggestionController(req, res, connection));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
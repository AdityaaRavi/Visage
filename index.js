// imports
import express from "express";
// controllers
import userStatsController from "./server/userInfo/userStatsController.js";
import getProfileController from "./server/userInfo/getProfileController.js";
import createUserController from "./server/authentication/createUserController.js";
import updateProfileController from "./server/userInfo/updateProfleController.js";
import getMessagesController from "./server/messaging/getMessagesController.js";
import sendMessageController from "./server/messaging/sendMessagesController.js";
import getExistingConnectionsController from "./server/connections/getExistingConnectionsController.js";
import getSuggestedConnectionsController from "./server/connections/getSuggestedConnectionsController.js";
import removeConnectionController from "./server/connections/removeConnectionController.js";
import declineSuggestionController from "./server/connections/declineSuggestionController.js";
import userLoginController from "./server/authentication/userLoginController.js";
import userLogoutController from "./server/authentication/userLogOutController.js";
import runIfLoggedIn from "./server/authentication/loginVerificationController.js";
import getEmailController from "./server/userInfo/getEmailController.js";
import updateLoginController from "./server/authentication/updateLoginController.js";
import isUniqueEmailController from "./server/userInfo/isUniqueEmailController.js";
import updateProfilePictureController from "./server/userInfo/updateProfilePictureController.js";


import mysql from 'mysql2';
import path from 'path';
import multer from 'multer';
const upload = multer({ dest: './profilePictures/'});



// if RDS_HOSTNAME is not defined, then we are running locally
if (process.env.RDS_HOSTNAME === undefined) {
  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
  });
} else {
  var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
  });
}


connection.connect((err) => {if (err) throw err});

const PORT = process.env.PORT || 3001;

const app = express();

// This will add the body of a POST request to the req.body object
app.use(express.json());

// Adding a static server to allow the frontend to be served from the backend.
app.use(express.static(path.join(process.cwd(), 'visage-app', 'build')));

// Adding a static server to allow the profile pictures to be served from the backend.
app.use(express.static(path.join(process.cwd(), 'profilePictures')));

// print out the request if the program is running locally
if (process.env.RDS_HOSTNAME === undefined) {
  app.use((req, res, next) => {
    if (req.method == "POST") console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
  });
}

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});
////////////////////////////////// User info //////////////////////////////////

// GET request for user stats.
app.get("/userStats/", (req, res) =>  runIfLoggedIn(req, res, userStatsController, connection));
//app.get("/userStats/", (req, res) => userStatsController(req, res, connection));

// GET request to get a user's profile.
app.get('/getProfile/', (req, res) =>  runIfLoggedIn(req, res, getProfileController, connection));

// POST request to create a user account.
app.post('/createUser', upload.single('image'), (req, res) => createUserController(req, res, connection));

// POST request to update a user's profile.
app.post('/updateProfile', (req, res) => runIfLoggedIn(req, res, updateProfileController, connection));

// GET request to get a user's email.
app.get('/getEmail/', (req, res) => runIfLoggedIn(req, res, getEmailController, connection));

// POST request to update a user's login info.
app.post('/updateLogin', (req, res) => runIfLoggedIn(req, res, updateLoginController, connection));

// POST request to login a user.
app.post('/login', (req, res) => userLoginController(req, res, connection));

// POST request to logout a user.
app.post('/logout', (req, res) => userLogoutController(req, res, connection));

// GET request to check if an email is unique.
app.get('/isUniqueEmail/', (req, res) => isUniqueEmailController(req, res, connection));

// POST request to change the profile picture of a user.
app.post('/updateProfilePicture/', upload.single('image'), (req, res) => runIfLoggedIn(req, res, updateProfilePictureController, connection));

////////////////////////////////// Messaging //////////////////////////////////
// GET request for all the messages between two users.
app.get("/getMessages/", (req, res) => runIfLoggedIn(req, res, getMessagesController, connection)); 

// POST request to send a message to a user.
app.post('/sendMessage/',(req, res) =>  runIfLoggedIn(req, res, sendMessageController, connection));
//app.post('/sendMessage/',(req, res) =>  sendMessageController(req, res, connection));

////////////////////////////////// Connections //////////////////////////////////
// GET request for all the connections of a user.
app.get("/getExistingConnections/", (req, res) =>  runIfLoggedIn(req, res, getExistingConnectionsController, connection));

// GET request to the connection suggestions created by us for the user.
app.get('/getSuggestedConnections/', (req, res) =>  runIfLoggedIn(req, res, getSuggestedConnectionsController, connection));

// POST request to remove a connection.
app.post('/removeConnection/',(req, res) => runIfLoggedIn(req, res, removeConnectionController, connection));

// POST request to decline a suggested connection.
app.post('/declineSuggestion/',(req, res) => runIfLoggedIn(req, res, declineSuggestionController, connection));

// GET endpoint to handle internal routing within the react app when the app is deployed.
app.get('/*', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'visage-app', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
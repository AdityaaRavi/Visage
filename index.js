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
import acceptSuggestionController from "./server/connections/acceptSuggestionController.js";
import userLoginController from "./server/authentication/userLoginController.js";
import userLogoutController from "./server/authentication/userLogOutController.js";
import runIfLoggedIn from "./server/authentication/loginVerificationController.js";
import getEmailController from "./server/userInfo/getEmailController.js";
import updateLoginController from "./server/authentication/updateLoginController.js";
import isUniqueEmailController from "./server/userInfo/isUniqueEmailController.js";


import mysql from 'mysql2';

// if(process.env.NODE_ENV === 'development'){
//   var connection = mysql.createConnection({
//       host: '127.0.0.1',
//       user: 'root',
//       // password: '',
//   });
// } else {
//   var connection = mysql.createConnection({
//     host: process.env.host, //"visage.database.windows.net", 
//     user: process.env.user,//"visage_admin", 
//     password: process.env.password,
//     database: process.env.database, 
//     Port: process.env.db_port,
//   });
// }
console.log(process.env);

var connection = mysql.createConnection({
  host: process.env.host, //"visage.database.windows.net", 
  user: process.env.user,//"visage_admin", 
  password: process.env.password,
  database: process.env.database, 
  Port: process.env.db_port,
});


connection.connect((err) => {if (err) throw err});

const PORT = process.env.PORT || 3001;

const app = express();

// This will add the body of a POST request to the req.body object
app.use(express.json());
app.use(express.static(process.cwd()+"/visage-app/build/"));
// // print out the request
// app.use((req, res, next) => {
//   if (req.method == "POST") console.log(`Request_Endpoint: ${req.method} ${req.url}`);
//   next();
// });

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});
////////////////////////////////// User info //////////////////////////////////

// GET request for user stats (++ connected to the database)
app.get("/userStats/", (req, res) =>  runIfLoggedIn(req, res, userStatsController, connection));
//app.get("/userStats/", (req, res) => userStatsController(req, res, connection));

// GET request to get a user's profile (++ connected to the database)
app.get('/getProfile/', (req, res) =>  runIfLoggedIn(req, res, getProfileController, connection));

// POST request to create a user account --- NOT YET IMPLEMENTED ON THE FRONTEND (++ connected to the database)
app.post('/createUser', (req, res) => createUserController(req, res, connection));

// POST request to update a user's profile (++ connected to the database)
app.post('/updateProfile', (req, res) => runIfLoggedIn(req, res, updateProfileController, connection));

// GET request to get a user's email (++ connected to the database)
app.get('/getEmail/', (req, res) => runIfLoggedIn(req, res, getEmailController, connection));

// POST request to update a user's login info (++ connected to the database)
app.post('/updateLogin', (req, res) => runIfLoggedIn(req, res, updateLoginController, connection));

// POST request to login a user (++ connected to the database)
app.post('/login', (req, res) => userLoginController(req, res, connection));

// POST request to logout a user (++ connected to the database)
app.post('/logout', (req, res) => userLogoutController(req, res, connection));

// GET request to check if an email is unique (++ connected to the database)
app.get('/isUniqueEmail/', (req, res) => isUniqueEmailController(req, res, connection));

////////////////////////////////// Messaging //////////////////////////////////
// GET request for all the messages between two users (++ connected to the database)
app.get("/getMessages/", (req, res) => runIfLoggedIn(req, res, getMessagesController, connection)); 

// POST request to send a message to a user (++ connected to the database)
app.post('/sendMessage/',(req, res) =>  runIfLoggedIn(req, res, sendMessageController, connection));
//app.post('/sendMessage/',(req, res) =>  sendMessageController(req, res, connection));

////////////////////////////////// Connections //////////////////////////////////
// GET request for all the connections of a user  (++ connected to the database)
app.get("/getExistingConnections/", (req, res) =>  runIfLoggedIn(req, res, getExistingConnectionsController, connection));

// GET request to the connection suggestions created by us for the user (++ connected to the database)
app.get('/getSuggestedConnections/', (req, res) =>  runIfLoggedIn(req, res, getSuggestedConnectionsController, connection));

// POST request to remove a connection (++ connected to the database)
app.post('/removeConnection/',(req, res) => runIfLoggedIn(req, res, removeConnectionController, connection));

// POST request to decline a suggested connection (++ connected to the database)
app.post('/declineSuggestion/',(req, res) => runIfLoggedIn(req, res, declineSuggestionController, connection));

// // POST request to accept a suggested connection
// /// Might not need an endpoint for this... If a person sends a message, the other person should automatically be considered a connection.
// app.post('/acceptSuggestion/', (req, res) => acceptSuggestionController(req, res, connection));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
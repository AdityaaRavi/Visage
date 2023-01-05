const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// GET request for user stats
app.get("/userStats/", (req, res) => {

  const userId = req.query.userId;
  
  res.json({
    numConnections: 52,
    top4Skills: ["React.js", "Tensorflow", "Java", "Leadership"],
  });
});

// GET request for all the messages between two users
app.get("/getMessages/", (req, res) => {
  const userId = req.query.userId;
  const otherPersonId = req.query.otherPersonId;
  //console.log(req.query);
  let toSend = {
    messages:[
        {sender: userId, message: 'Hey!'},
        {sender: otherPersonId, message: 'Hi!, How are you?'},
        {sender: userId, message: 'I am good!'},
        {sender: otherPersonId, message: 'That is great!'},
        {sender: userId, message: 'How about you?'},
        {sender: otherPersonId, message: 'I am good too!'},
        {sender: userId, message: 'That is great!'},
        {sender: otherPersonId, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {sender: userId, message: '1'},
        {sender: otherPersonId, message: '2'},
        {sender: userId, message: '3'},
        {sender: otherPersonId, message: '4'},
        {sender: userId, message: '5'},
        {sender: otherPersonId, message: '6'},
        {sender: userId, message: '7'},
        {sender: otherPersonId, message: '8'},
        {sender: userId, message: '9'},
        {sender: otherPersonId, message: '10'},
    ],
    OtherPersonName: 'John Doe',
  };
  //console.log(toSend);

  res.json(toSend);
}); 

// GET request for all the connections of a user
app.get("/getExistingConnections/", (req, res) => {

  const userId = req.query.userId;

  res.json([
    {id: 1, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 2, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 3, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 4, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 5, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 6, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 7, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 8, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 9, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 10, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 11, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 12, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 13, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 14, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 153, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 161, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 172, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 183, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 191, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 220, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 321, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},

  ]);
});

// GET request to the connection suggestions created by us for the user
app.get('/getSuggestedConnections/', (req, res) => {
  const userId = req.query.userId;
  
  res.json([
    {id: 1, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 2, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 3, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 4, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 5, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 6, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 7, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 8, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 9, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 10, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 11, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 12, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 13, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 14, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 153, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 161, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 172, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 183, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    {id: 191, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
    {id: 220, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
    {id: 321, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},

  ]);
});

// GET request to get a user's profile
app.get('/getProfile/', (req, res) => {
  const userId = req.query.userId;
  
  res.json({
    id: userId,
    name: 'Adityaa Ravi',
    orgs: ['SacHacks', 'PayPal', 'Google DSC at UCD', 'UCD CS Tutoring Commitee'],
    schools: ['University of California, Davis'],
    career: ['Full Stack Development', 'Machine Learning', 'Hackathons'],
    fun: ['Biking', 'Travel', 'Badminton'],
    description: 'I am currently looking for an Software Engineering Internship for Spring 2023.' + 
    ' Open to chat and connect!'
  });
});

// POST request to create a user
app.post('/createUser', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const userId = math.random();
  
  try{
    // Create user
    res.json({
      message: `User created successfully!`,
      userId: userId
    });
  } catch (err) {
    res.json(err);
  }
});


// POST request to send a message to a user
app.post('/sendMessage/', (req, res) => {
  const senderId = req.body.senderId;
  const recepientId = req.body.recepientId;
  const message = req.body.message;

  try{
    // Send message to user
    res.json({
      message: `Message sent successfully! from ${senderId} to ${recepientId}`
    });
  } catch (err) {
    res.json(err);
  }
});

// POST request to remove a connection
// POST /removeConnection/:userId
app.post('/removeConnection/', (req, res) => {
  const userId = req.body.userId;
  const otherPersonId = req.body.otherPersonId;

  try{
    // Remove connection
    res.json({
      message: `Connection removed successfully! from ${userId} to ${otherPersonId}`
    });
  } catch (err) {
    res.json(err);
  }
});

// POST request to remove a connection
app.post('/removeConnection/', (req, res) => {
  const userId = req.body.userId;
  const otherPersonId = req.body.otherPersonId;

  try{
    // Remove connection
    res.json({
      message: `Connection removed successfully! from ${userId} to ${otherPersonId}`
    });
  } catch (err) {
    res.json(err);
  }
});

// POST request to decline a suggested connection
app.post('/declineSuggestion/', (req, res) => {
  const userId = req.body.userId;
  const otherPersonId = req.body.otherPersonId;

  try{
    // Remove connection
    res.json({
      message: `Connection declined successfully! from ${userId} to ${otherPersonId}`
    });
  } catch (err) {
    res.json(err);
  }
});

// POST request to accept a suggested connection
app.post('/acceptSuggestion/', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
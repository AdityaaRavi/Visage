const getSuggestedConnectionsController = (req, res) => {
    const userId = req.query.userId;
    
    res.json([
      {id: 1, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
      {id: 2, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
      {id: 3, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
      {id: 4, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
      {id: 5, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
      {id: 6, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
    ]);
};

export default getSuggestedConnectionsController;
const getProfileController = (req, res) => {
    
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
};

export default getProfileController;
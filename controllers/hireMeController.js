const mongodb = require("../database/database");
const homeCont = {};
const ObjectId = mongodb.ObjectId;

connectCont = {};

connectCont.buildConnect = async function (req, res) {
    const successMessage = req.flash('success');
    const errorMessage = req.flash('error');
    const formData = req.flash('formData')[0];
    
    // Pass all the data in a single object to res.render
    res.render('hire_me', { 
        title: "Connect",
        success: successMessage, 
        error: errorMessage, 
        formData: formData || {}
    });
};

connectCont.getUser = async (req, res) => {
    try {
        const connect = await mongodb
            .getDb()
            .collection("connect")
            .find()
            .toArray();

        res.render("users", {
            title: "Interested Users",
            collaborators: connect
        });
    } catch (err) {
        console.error("Error fetching users (CATCH BLOCK):", err); 
        res.status(500).send("Error fetching users");
    }
};


connectCont.createUser = async (req, res) => {
  const user = {
    firstName: req.body.name,
    email: req.body.email,
    description: req.body.reason,
  };

  try {
    const result = await mongodb
      .getDb()
      .collection("connect")
      .insertOne(user);
      
    if (result.acknowledged) {
      // Set a success message and redirect to the same page
      req.flash('success', 'Thank you! Your message has been sent successfully.');
      res.redirect('/connect');
    } else {
      // If insertion fails, set an error message and make the data sticky
      req.flash('error', 'Failed to send your message. Please try again.');
      req.flash('formData', req.body);
      res.redirect('/connect');
    }
  } catch (error) {
    // If a database error occurs, set an error message and make the data sticky
    console.error('Database error:', error);
    req.flash('error', 'A database error occurred. Please try again later.');
    req.flash('formData', req.body);
    res.redirect('/connect');
  }
};

module.exports = connectCont;
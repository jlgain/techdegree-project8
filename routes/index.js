/* Dependencies */

// Create express and router instance
const express = require('express');
const router = express.Router();

/* Routes */

// GET home page
router.get('/', (req, res, next) => 
{
  res.redirect("/books")
});

// Export router to be referenced in app.js file
module.exports = router;

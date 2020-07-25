/* Dependencies */

// Create express and router instance
// Require book.js model to import
const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(callback)
{
    return async(req, res, next) =>
    {
        try
        {
            await callback(req, res, next)
        }
        catch(error)
        {
            res.status(500).send(error);
        }
    }
}

/* Routes */

// GET full list of books to show
router.get('/', asyncHandler(async(req, res) =>
{
    const books = await Book.findAll(
    {
        order:
        [
            [
                "createdAt", "DESC" 
            ]
        ]
    });

    res.render('books/index', {books: books, title: "SQL Library Manager"});
}));

// GET new book form to create new book
router.get('/new', (req, res) =>
{
    res.render('books/new-book', {book: {}, title: "New Book"});
});

// POST newly created book
router.post('/new', asyncHandler(async(req, res) =>
{
    let book;
    try
    {
        // Builds a new model instance, which represents a database row, and automatically stores the instance's data
        book = await Book.create(req.body);
        res.redirect('/books');
    }
    catch(error)
    {
        // If the error caught by catch is a SequelizeValidationError, re-render the articles/new view ("New Article" form), passing in the errors
        if (error.name === "SequelizeValidationError") 
        {
            // The Book.build() method returns a non-persistent (or unsaved) model instance
            // Data is stored in memory 
            book = await Book.build(req.body);
            res.render('books/new-book', {book: book, errors: error.errors, title: "New Book"});
        }
        else
        {
            // Throw other type of error caught in asyncHandler's catch block
            throw error;
        }
    }
}));

// GET book form to edit
router.get('/:id', asyncHandler(async(req, res) =>
{
    const book = await Book.findByPk(req.params.id);

    // If the book exists, render it to the books/update-book or edit view
    if (book)
    {
        res.render('books/update-book', {book: book, title: "Edit Book"});
    }
    else
    {
        // Send 404 error status to the client
        res.render('page-not-found', {title: "Page Not Found"});
        //res.sendStatus(404);
    }
}));

// POST update to individual book
router.post('/:id', asyncHandler(async(req, res) =>
{
    let book;
    try
    {
        book = await Book.findByPk(req.params.id);

        // If book exists, update book in database and redirect to updated book detail
        if (book)
        {
            await book.update(req.body);
            res.redirect('/books');
        }
        else
        {
            // Send 404 error status to client
            res.sendStatus(404);
        }
    }
    catch(error)
    {
        // Checking error type
        if (error.name === "SequelizeValidationError")
        {
            // The Book.build() method returns a non-persistent (or unsaved) model instance
            // Data is stored in memory 
            book = await Book.build(req.body);

            // Make sure correct book gets updated when re-rendering book to edit
            book.id = req.params.id;
            res.render('books/update-book', {book: book, errors: error.errors, title: 'Edit Book'});
        }
        else
        {
            // Throw other type of error caught in asyncHandler's catch block
            throw error;
        }
    }
}));

// GET Book to delete 
// router.get('/:id/delete', asyncHandler(async(req, res) =>
// {
//     const book = await Book.findByPk(req.params.id);

//     // If book exists, render it to the books/update-book or edit view
//     if (book)
//     {
//         res.render('/books/update-book', {book: book, title: 'Delete Book'});
//     }
//     else
//     {
//         // Send 404 error status to client
//         res.sendStatus(404);
//     }
// }));

// POST Delete Book
router.post('/:id/delete', asyncHandler(async(req, res) =>
{
    const book = await Book.findByPk(req.params.id);

    // If book exists, destroy/delete it and redirect to /books view
    if (book)
    {
        await book.destroy();
        res.redirect('/books');
    }
    else
    {
        // Send 404 error status to client
        res.sendStatus(404);
    }
}));

// Export router to be referenced in app.js file
module.exports = router;
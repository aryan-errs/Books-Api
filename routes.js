const express = require('express');
let router = express.Router();
const Book = require('./books')

router.get('/', (req,res)=>{
    res.json({
        status: 'WORKING',
        message: 'This is the /api/ route!'
    });
});

router.get('/books', async(req,res)=>{
    const books = await Book.find({});
    res.json({
        message: "Getting books data.",
        data: books
    });
});
router.post('/books/:id', async(req,res)=>{
    const { id } = req.params;
    Book.findById(id, function(err, book){
        if(err){
            res.json(err);
        }
        else{
            res.json({
                message: '1 Book Found!',
                data: book
            });
        }
    });
})

router.post('/books', async(req,res)=>{
    let book = new Book();
    book.title = req.body.title ? req.body.title : book.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    await book.save(function(err){
        if(err) {
            res.json(err);
        }
        else{
            res.json({
                message: "book Added",
                data: book
            });
        }
    });
});

router.put('/books/:id', async(req,res)=>{
    const { id } = req.params;
    Book.findById(id, function(err, book) { 
        if(err)
            res.send(err);
        book.title = req.body.title ? req.body.title : book.title;
        book.author = req.body.author ? req.body.author : book.author;
        book.genre = req.body.genre ? req.body.genre : book.genre;
        book.save(function(err){
            if(err)
                res.send(err);
            res.json({
                message: "Contact Updated",
                data: book
            });
        });
    });
})

router.delete('/books/:id', async(req,res) => {
    const { id }  = req.params;
    Book.findByIdAndDelete(id, function(err, book){
        if(err){
            res.send(err);
        }
        res.json({
            message: "Succesfully Deleted",
            data: book
        });
    });
});

module.exports = router;
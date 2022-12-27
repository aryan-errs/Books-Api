const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre:{
        type: String
    },
    addDate: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;

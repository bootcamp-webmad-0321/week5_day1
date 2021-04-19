const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    author: {
        type: String,
        required: [true, 'El autor es obligatorio']
    },
    rating: {
        type: String,
        required: [true, 'El rating de usuario es obligatorio']
    }
}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
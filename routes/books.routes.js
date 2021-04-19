const express = require('express')
const router = express.Router()

const Book = require('./../models/book.model')

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { capitalizeText, isValidIdFormat, isEditor, isAdmin, formatValidationError } = require('./../utils')

const mongoose = require('mongoose')



// Books list
router.get('/', (req, res) => {

    Book
        .find()
        .then(allBooks => res.render('pages/books/books-list', { allBooks, msg: req.query.msg, isAdmin: isAdmin(req.session.currentUser), isEditor: isEditor(req.session.currentUser) }))
        .catch(err => console.log('Error!', err))
})


// Book details
router.get('/detalles/:book_id', (req, res) => {

    const { book_id } = req.params

    if (isValidIdFormat(book_id)) {

        Book
            .findById(book_id)
            .then(theBook => res.render('pages/books/book-detail', { theBook, isAdmin: isAdmin(req.session.currentUser), isEditor: isEditor(req.session.currentUser) }))
            .catch(err => console.log('Error!', err))

    } else {
        res.redirect('/libros')
    }
})



// Book form (get)
router.get('/crear', isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res) => res.render('pages/books/new-book-form'))

// Book form (post)
router.post('/crear', isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res) => {

    let { title, description, author, rating } = req.body

    title = capitalizeText(title)

    Book
        .create({ title, description, author, rating })
        .then(() => res.redirect('/libros?msg=Libro creado correctamente'))
        .catch(err => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.render('pages/books/new-book-form', { errorMessage: formatValidationError(err) })
            } else {
                next()
            }
        })
})




// Book edit (get)
router.get('/editar', isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res) => {

    const { book_id } = req.query

    Book
        .findById(book_id)
        .then(book => res.render('pages/books/edit-book-form', book))
        .catch(err => console.log('Error!', err))
})


// Book edit (post)
router.post('/editar', isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res) => {

    const { book_id } = req.query
    const { title, description, author, rating } = req.body

    Book
        .findByIdAndUpdate(book_id, { title, description, author, rating })
        .then(editedBook => res.redirect(`/libros/detalles/${editedBook._id}`))
        .catch(err => console.log('Error!', err))
})


module.exports = router
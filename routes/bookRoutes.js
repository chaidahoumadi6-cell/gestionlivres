const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Créer un nouveau livre
router.post('/', bookController.createBook);

// Récupérer tous les livres
router.get('/', bookController.getAllBooks);

// Rechercher un livre par titre
router.get('/search', bookController.searchByTitle);

// Récupérer un livre par ID
router.get('/:id', bookController.getBookById);

// Mettre à jour un livre
router.put('/:id', bookController.updateBook);

// Supprimer un livre
router.delete('/:id', bookController.deleteBook);

module.exports = router;

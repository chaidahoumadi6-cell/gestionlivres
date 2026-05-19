const Book = require('../models/Book');

// Créer un nouveau livre
exports.createBook = async (req, res) => {
  try {
    const { titre, auteur, statutDePublication } = req.body;

    // Validation
    if (!titre || !auteur) {
      return res.status(400).json({
        success: false,
        message: 'Le titre et l\'auteur sont obligatoires',
      });
    }

    const book = await Book.create({
      titre,
      auteur,
      statutDePublication: statutDePublication || false,
    });

    res.status(201).json({
      success: true,
      message: 'Livre créé avec succès',
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du livre',
      error: error.message,
    });
  }
};

// Récupérer tous les livres
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    res.status(200).json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des livres',
      error: error.message,
    });
  }
};

// Récupérer un livre par ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livre non trouvé',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du livre',
      error: error.message,
    });
  }
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, auteur, statutDePublication } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livre non trouvé',
      });
    }

    await book.update({
      titre: titre || book.titre,
      auteur: auteur || book.auteur,
      statutDePublication: statutDePublication !== undefined ? statutDePublication : book.statutDePublication,
    });

    res.status(200).json({
      success: true,
      message: 'Livre mis à jour avec succès',
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du livre',
      error: error.message,
    });
  }
};

// Supprimer un livre
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livre non trouvé',
      });
    }

    await book.destroy();

    res.status(200).json({
      success: true,
      message: 'Livre supprimé avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du livre',
      error: error.message,
    });
  }
};

// Rechercher un livre par titre
exports.searchByTitle = async (req, res) => {
  try {
    const { titre } = req.query;

    if (!titre) {
      return res.status(400).json({
        success: false,
        message: 'Le titre est obligatoire pour la recherche',
      });
    }

    const books = await Book.findAll({
      where: {
        titre: {
          [require('sequelize').Op.like]: `%${titre}%`,
        },
      },
    });

    res.status(200).json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche',
      error: error.message,
    });
  }
};

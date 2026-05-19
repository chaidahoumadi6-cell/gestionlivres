require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME || 'gestionlivres';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Hakim02112006';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;

const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.end();
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue à l\'API de gestion des livres',
    version: '1.0.0',
  });
});

// Initialiser la base de données et démarrer le serveur
const startServer = async () => {
  try {
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log('✓ Connexion à la base de données réussie');

    await sequelize.sync({ alter: true });
    console.log('✓ Modèles synchronisés');

    app.listen(PORT, () => {
      console.log(`✓ Serveur démarré sur le port ${PORT}`);
      console.log(`  http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();

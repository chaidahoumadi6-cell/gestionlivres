# API de Gestion des Livres

Une API REST backend pour gérer une collection de livres. Construite avec Express.js, Sequelize et MySQL.

## Installation

1. **Cloner le projet et installer les dépendances:**
   ```bash
   npm install
   ```

2. **Créer un fichier `.env` basé sur `.env.example`:**
   ```bash
   cp .env.example .env
   ```

3. **Configurer les variables d'environnement** dans le fichier `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=votre_password
   DB_NAME=gestionlivres
   DB_PORT=3306
   PORT=3000
   ```

4. **S'assurer que MySQL est en cours d'exécution** et créer la base de données (optionnel):
   ```sql
   CREATE DATABASE gestionlivres CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

## Démarrage du serveur

**Mode production:**
```bash
npm start
```

**Mode développement (avec rechargement automatique):**
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000` par défaut.

## Endpoints de l'API

### 1. Créer un nouveau livre
**POST** `/api/books`

```json
{
  "titre": "Le Seigneur des Anneaux",
  "auteur": "J.R.R. Tolkien",
  "statutDePublication": true
}
```

### 2. Récupérer tous les livres
**GET** `/api/books`

Réponse:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "titre": "Le Seigneur des Anneaux",
      "auteur": "J.R.R. Tolkien",
      "statutDePublication": true,
      "createdAt": "2026-05-19T10:00:00.000Z",
      "updatedAt": "2026-05-19T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

### 3. Récupérer un livre par ID
**GET** `/api/books/:id`

Exemple: `GET /api/books/1`

### 4. Rechercher un livre par titre
**GET** `/api/books/search?titre=Seigneur`

Récherche les livres contenant "Seigneur" dans le titre.

### 5. Mettre à jour un livre
**PUT** `/api/books/:id`

```json
{
  "titre": "Le Seigneur des Anneaux - Nouvelle édition",
  "auteur": "J.R.R. Tolkien",
  "statutDePublication": true
}
```

Tous les champs sont optionnels. Seuls les champs fournis seront mis à jour.

### 6. Supprimer un livre
**DELETE** `/api/books/:id`

Exemple: `DELETE /api/books/1`

## Structure du projet

```
.
├── config/
│   └── database.js           # Configuration Sequelize
├── models/
│   └── Book.js              # Modèle Book
├── controllers/
│   └── bookController.js    # Logique métier des livres
├── routes/
│   └── bookRoutes.js        # Routes de l'API
├── server.js                # Point d'entrée
├── package.json
├── .env.example
└── README.md
```

## Attributs d'un livre

- **id**: Identifiant unique (auto-incrémenté)
- **titre**: Le titre du livre (obligatoire)
- **auteur**: L'auteur du livre (obligatoire)
- **statutDePublication**: Indique si le livre est publié (booléen, par défaut: false)
- **createdAt**: Date de création (automatique)
- **updatedAt**: Date de dernière modification (automatique)

## Codes de réponse

- `200`: Succès
- `201`: Ressource créée
- `400`: Erreur de validation
- `404`: Ressource non trouvée
- `500`: Erreur serveur

## Exemples avec cURL

**Créer un livre:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"titre":"1984","auteur":"George Orwell","statutDePublication":true}'
```

**Récupérer tous les livres:**
```bash
curl http://localhost:3000/api/books
```

**Rechercher un livre:**
```bash
curl "http://localhost:3000/api/books/search?titre=1984"
```

**Mettre à jour un livre:**
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"statutDePublication":false}'
```

**Supprimer un livre:**
```bash
curl -X DELETE http://localhost:3000/api/books/1
```

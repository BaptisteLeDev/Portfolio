import express from 'express';
import path from 'path';
import dotenv from 'dotenv';


const app = express();
const port = process.env.PORT || 5000;

// Middleware pour servir les fichiers statiques (dossier dist de Vite)
app.use(express.static(path.join(__dirname, '../../dist'))); // Mise à jour du chemin

// API de test
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express API' });
});

// Redirection vers index.html pour toutes les autres routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html')); // Mise à jour du chemin
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

dotenv.config();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

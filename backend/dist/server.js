"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware pour servir les fichiers statiques (dossier dist de Vite)
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
// API de test
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express API' });
});
// Redirection vers index.html pour toutes les autres routes
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist/index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

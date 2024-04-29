const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());
const PORT = 1999;
dotenv.config();

// Connexion à la base de données
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE Connected '))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Routes
const authroutes = require("./routes/authroutes");
app.use("/",authroutes);
const clientroutes = require("./routes/clientroutes");
app.use("/client",clientroutes);
const adminroutes = require("./routes/adminroutes");
app.use("/admin",adminroutes);
const operatorroutes = require("./routes/operatorroutes");
app.use("/operator",operatorroutes);
// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur is work on ${PORT}`);
});

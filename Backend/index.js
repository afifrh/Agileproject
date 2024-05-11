const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware

const app = express();
// const express = require("express")
const http = require("http")
// const mongo = require("mongoose")
const config= require('./config/dbconnection.json')
 const bodyparser = require("body-parser")
// var app=express();
app.use(express.json());
 app.use(bodyparser.json())
const PORT = 1999;
 dotenv.config();

// Connexion à la base de données
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE Connected '))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));
// mongo.connect(config.url,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     })
//     .then(()=>console.log("database connected"))
//     .catch(()=>console.log("not connected"))

// CORS Configuration
const corsOptions = {
  origin: '*', // Replace with your Angular app's origin
  optionsSuccessStatus: 200 // Optionally set HTTP status code for preflight requests
};

app.use(cors(corsOptions)); // Apply CORS middleware to all routes

// Routes
const authroutes = require("./routes/authroutes");
app.use("", authroutes);
const clientroutes = require("./routes/clientroutes");
app.use("/client", clientroutes);
const adminroutes = require("./routes/adminroutes");
app.use("/admin", adminroutes);
const operatorroutes = require("./routes/operatorroutes");
app.use("/operator", operatorroutes);

// Démarrage du serveur
const server=http.createServer(app)
server.listen(1999,console.log("database"))
module.exports=app

const dotenv = require('dotenv');
const express=require('express');
const mongoose = require('mongoose');

const app=express();

app.use(express.json());
const PORT = 1999;
dotenv.config();

//db connection
//const mongoString = process.env.DATABASE_URL;
mongoose.connect('mongodb+srv://afif:afif12345@afif.l0krceb.mongodb.net/reservation?retryWrites=true&w=majority&appName=afif')
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
});
// routes 
//const salleRoutes = require("./routes/salleRoutes");
//app.use("/salle", salleRoutes);
//const userRoutes= require("./routes/userRoutes");
//app.use("/user", userRoutes);
//const reservationRoutes= require("./routes/reservationRoutes");
//app.use("/reservation", reservationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
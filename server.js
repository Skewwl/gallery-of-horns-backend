'use strict';

//import functionality
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//import global variables
const PORT = process.env.PORT;
let Beasts = require('./src/beastModel');

//create server, specify allowed origins & data format
const app = express();
app.use(cors());
app.use(express.json());

//connect to mongodb atlas and verify connection is working
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongoose is connected'));

//route handlers
app.get('/', (req, res) => {
    res.status(200).json({message: 'Default route functioning properly.'});
});

app.get('/beasts', async (req, res)=> {
    try{
        const beasts = await Beasts.find();
        res.status(200).json({data: beasts});
    } catch (err) {
        res.status(404).json({message: err});
    }
});

app.post('/beasts', (req, res) => {
    const data = req.body;
    Beasts.create(data)
        .then(response => res.status(201).json(response))
        .catch(err => res.status(404).json(err.message));
});

app.delete('/beasts/:id', async (req, res) => {
    let beastToDel = await req.params.id;
    Beasts.findByIdAndDelete(beastToDel)
        .then(deltedBook => res.status(204).json(deltedBook))
        .catch(err => res.status(404).send(err));
});

app.all('*', (req, res, next) =>{
    
});

app.listen(PORT, ()=>console.log(`listening on ${PORT}`));

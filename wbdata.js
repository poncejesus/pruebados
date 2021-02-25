//ESTE ARCHIVO SOLO AGREGA UN DATO INDICADO
const mongoose = require('mongoose');

const NumInt = require('./models/webscrap');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    const p = new NumInt({
        numIntegracion:46765262,
        contenedor:'C-123',
        cliente:'clienteUno',
    })
    p.save().then(p =>{
        console.log(p)
    })
    .catch(e =>{
        console.log(e)
    })



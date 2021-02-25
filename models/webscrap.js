//ESTE ARCHIVO ES PARA DEFINIR LOS PARAMETROS INICIALES PARA MONGO
const mongoose = require('mongoose');
const scrapSchema = new mongoose.Schema({
    pedimento:{
        type:String,
        default:"sin numero de pedimento"
    },
    numIntegracion: {
        type:Number,
        required:true
    },
    contenedor:{
        type: String,
        default:'pendiente'
    },
    cliente:{
        type:String,
        enum:['clienteUno','clienteDos', 'clienteTres'],
        required:true
    },
    fecha:{
       type:Date,
       default:new Date()
    },
    estado:{
        type:String,
        default:'desconocido'
    },
    datosHTMLuno:{
        type:String,
        default:"en espera"
    },
    datosHTMLdos:{
        type:String,
        default:"en espera"
    }
})

const NumInt = mongoose.model('NumInt', scrapSchema);

module.exports = NumInt;
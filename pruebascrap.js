//notas nuevas 2021 correr con npm start o si quieres nodemon con npm run desarrollo
//para correrlo con nodemon: npx nodemon pruebascrap.js
//este usa los js de webscrap.js y wbdata.js
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
//agregado de puppeteer
const puppeteer = require('puppeteer')

//este agarra el modulo exportado
const NumInit = require('./models/webscrap');
const NumInt = require('./models/webscrap');
const { ALL } = require('dns');

require('dotenv').config({path:'variables.env'})

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/main', async (req, res) => {
    const {cliente} = req.query;
    if(cliente){
        const numinteg = await NumInit.find({cliente})
        res.render('indice.ejs', {numinteg, cliente})
    }else{
        //esta linea busca los numeros en mongo
        const numinteg = await NumInit.find({})
    res.render('indice.ejs', {numinteg, cliente:'todos'})
    }
})

app.get('/main/crear',(req,res) =>{
    res.render('crearpedimento.ejs')
})

app.post('/main',async (req,res) =>{
    const nuevoNumero =  new NumInit(req.body);
    await nuevoNumero.save();
    console.log(nuevoNumero)
//    res.redirect(`/main/${nuevoNumero._id}`)
    res.redirect("/main")
})

app.get('/main/:id', async (req,res) =>{
    const {id} = req.params;
    const pedimento = await NumInit.findById(id)
   res.render('detalles.ejs',{pedimento})
})

app.get('/main/:id/editar', async (req,res) =>{
    const {id} = req.params;
    const pedimento = await NumInit.findById(id)
   res.render('editar.ejs',{pedimento})
})

app.put('/main/:id', async (req,res)=>{
    const {id} = req.params;
    const pedimento = await NumInt.findByIdAndUpdate(id, req.body, {runValidators:true})
    res.redirect(`/main/${pedimento._id}`)
})

app.delete('/main/:id', async (req, res)=>{
    const {id} = req.params;
    const eliminarPedimento = await NumInt.findByIdAndDelete(id);
    res.redirect('/main');
})

app.post('/main/:id/delete', async (req, res)=>{
    const {id} = req.params;
    const eliminarPedimento = await NumInt.findByIdAndDelete(id);
    res.redirect('/main');
})

//***********************puppeteer*********************

app.get('/actualizar', async (req,res) =>{
    const pedimentos = await NumInit.find({}) 
    for(let pedimento of pedimentos) { 
        console.log(pedimento.numIntegracion)
    } 
    res.render('actualizar.ejs')
})

app.post('/actualizar', async (req, res) => {
    //esta linea busca los numeros en mongo
//    const numinteg = await NumInit.findOne({})
  //  var numeroInt = (numinteg.numIntegracion)

    const pedimentos = await NumInit.find({'datosHTMLuno':'en espera'}) 
    for(let pedimento of pedimentos) { 
    async function scrapeProduct(url){
    const browser = await puppeteer.launch({headless:false});//{headless:false}
    const page = await browser.newPage();
    //46765262  44115589  53754459
    //N ELIMINADO: 42154573 NO PRESENTADO: 42154574
    //https://pecem.mat.sat.gob.mx/app/qr/ce/faces/pages/mobile/validadorqr.jsf?D1=16&D2=1&D3=44115589
    try {
        await page.goto('https://pecem.mat.sat.gob.mx/app/qr/ce/faces/pages/mobile/validadorqr.jsf?D1=16&D2=1&D3='+pedimento.numIntegracion,{timeout:5000});

        await page.waitFor(3000);
        await page.screenshot({path: 'example.png', fullPage: true});
        
        console.log('***********************')
        await page.waitFor(3000);
        try {
            //await page.waitForSelector('#j_idt12\\:1\\:j_idt13\\:j_idt15 > tbody > tr:nth-child(2) > td');
            await page.waitForSelector('#j_idt12\\:1\\:j_idt13 > li.ui-li.ui-li-static.ui-body-c.ui-corner-bottom');
            const textContentUno = await page.evaluate(() => {
                //return document.querySelector('#j_idt12\\:1\\:j_idt13\\:j_idt15 > tbody > tr:nth-child(2) > td').innerHTML;
                return document.querySelector('#j_idt12\\:1\\:j_idt13 > li.ui-li.ui-li-static.ui-body-c.ui-corner-bottom').innerText;
            });
            //const stringSplitUno = textContent.substring(50);
            console.log("PRIMERA OPCION<li id='primeraSeccion'>",textContentUno,"</li>");                 
            const datosUnoUno = (`${textContentUno}`)                 
            await pedimento.updateOne({datosHTMLuno:`${datosUnoUno}`})
        } catch (error) {
            await page.waitForSelector('#j_idt16\\:1\\:j_idt17\\:j_idt20 > tbody > tr:nth-child(2) > td');
            const textContentDos = await page.evaluate(() => {
                return document.querySelector('#j_idt16\\:1\\:j_idt17\\:j_idt20 > tbody > tr:nth-child(2) > td').innerHTML;
            });
            //const stringSplitUno = textContent.substring(50);
            console.log("SEGUNDA OPCION<li id='primeraSeccion'>",textContentDos,"</li>"); 
            const datosUnoDos = (`${textContentDos}`)                 
            await pedimento.updateOne({datosHTMLuno:`${datosUnoDos}`})
        }

        try {
            await page.waitForSelector("#j_idt12\\:2\\:j_idt13\\:j_idt28 > li.ui-li.ui-li-static.ui-body-c.ui-corner-top");
            const cajaContentUno = await page.evaluate(() => {
                return document.querySelector("#j_idt12\\:2\\:j_idt13\\:j_idt28 > li.ui-li.ui-li-static.ui-body-c.ui-corner-top").innerHTML;
            });
            console.log("PRIMERA OPCION<li id='segundaSeccion'>",cajaContentUno,"</li>"); 
            const datosDosUno = (`${cajaContentUno}`)                 
            await pedimento.updateOne({datosHTMLdos:`${datosDosUno}`})
        } catch (error) {
            try {
                await page.waitForSelector("#j_idt12\\:2\\:j_idt13\\:j_idt33 > li.ui-li.ui-li-static.ui-body-c.ui-corner-top");
                const cajaContentDos = await page.evaluate(() => {
                    return document.querySelector("#j_idt12\\:2\\:j_idt13\\:j_idt33 > li.ui-li.ui-li-static.ui-body-c.ui-corner-top").innerHTML;
                });
                console.log("SEGUNDA OPCION<li id='segundaSeccion'>",cajaContentDos,"</li>");                 
                const datosDosDos = (`${cajaContentDos}`)                 
                await pedimento.updateOne({datosHTMLdos:`${datosDosDos}`})
            } catch (error) {
                await page.waitForSelector("#j_idt16\\:2\\:j_idt17\\:j_idt36 > li.ui-li.ui-li-static.ui-body-c.ui-corner-top");
                const cajaContentTres = await page.evaluate(() => {
                    return document.querySelector("#j_idt16\\:2\\:j_idt17\\:j_idt36 > li.ui-li.ui-li-static.ui-body-c.ui-corner-top").innerHTML;
                });
                console.log("TERCERA OPCION<li id='segundaSeccion'>",cajaContentTres,"</li>");
                const datosDosTres = (`${cajaContentTres}`)                 
                await pedimento.updateOne({datosHTMLdos:`${datosDosTres}`})                                     
            }
        }
     
        browser.close();
        console.log('listo')        
    } catch (error) {
        console.log('errorzaso pa')
    }

}
scrapeProduct('https://pecem.mat.sat.gob.mx/app/qr/ce/faces/pages/mobile/validadorqr.jsf?D1=16&D2=1&D3='+pedimento.numIntegracion);
    }
res.redirect('/main')



})











const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () =>{
    console.log('El server esta al millon y pasadito pa');
});


//para buscar en mongo: mongo, show dbs, use elnombredeladb, show collections, db.nombredb.find()
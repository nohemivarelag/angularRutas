'use strict'
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')




const Product = require('./models/fgemproduct');
mongoose.set('debug', true);
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.get('/api/fgemproduct', (req, res) => {
    Product.find({}, (err, fgemproducts) => {
      if (err) return res. status(500).send({ message:`Error al realizar la peticion ${err}` })
   if (!fgemproducts) return res.status(404).send({ message: `No existen los productos` })
   res.status(200).send({fgemproducts});
    });
});
    app.get('/api/fgemproduct/:fgemproductId', (req, res) => {   
        let fgemproductId = req.params.fgemproductId
        Product.findById(fgemproductId, (err, fgemproducts) => {
                if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
                //busca por id en la bd
                if (!fgemproduct) return res.status(400).send({ message: `El producto no existe` })//si el producto no existe el !niega
                res.send(200, { fgemproduct });
        })
});
app.post('/api/fgemproduct', (req, res) => {
        console.log('POST /api/fgemproduct')
        console.log(req.body)
        let fgemproduct = new Product();
        fgemproduct.name = req.body.name;
       fgemproduct.price = req.body.price;
       fgemproduct.description = req.body.description;
       fgemproduct.images = req.body.images;
        fgemproduct.stock = req.body.stock -5;
        fgemproduct.discounts = req.body.discounts;
              fgemproduct.reviews.stars = req.body.stars;
              fgemproduct.reviews.comments = req.body.comments;
              fgemproduct.reviews.author = req.body.author;
              console.log(fgemproduct);
    
              fgemproduct.save((err, gemproductStored)=>{
            if(err) res.status(500).send({message: `Error al salvar la base de datos: ${err}`})
            res.status(200).send({ fgemproduct: fgemproductStored })
        })
        
    });

    app.delete('/api/fgemproduct/:fgemproductId', (req, res) => {
        let fgemproductId = req.params.fgemproductId
        Product.findById(fgemproductId, (err, fgemproduct) => {
    
                if (err) return res.status(500).send({ message: `Error al borrar el producto ${err}` })
                Product.remove(err => {
                        if (err) return res.status(500).send({ message: `Error al borrar el producto ${err}` })
                                res.status(200).send({ message: `El producto ha sido borrado` })
                })
        })
    });

    app.put('/api/fgemproduct/:fgemproductId', (req, res) => {
        let fgemproductId = req.params.fgemproductId
        let update = req.body
    
        Product.findByIdAndUpdate(fgemproductId, update, (err, fgemproductUpdated) => {
                               if (err) res.status(500).send({
                            message: `Error al actualizar el producto
                    en la BD: ${err}`
                    }) //si ocurre un error se manda este mensaje
                    res.status(200).send({ fgemproduct: fgemproductUpdated })
    
            })
    });

    mongoose.connect('mongodb://localhost:27017/gema', (err, res) => {
        if (err) {
            return console.log(`Error al conectar con la BD: ${err}`)
        }
        console.log('La conexion con la BD fue exitosa')
    
        app.listen(port, () => {
            console.log(`API esta corriendo en localhost:${port}`)
        
        })
    })




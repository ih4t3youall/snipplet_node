const express = require('express');
const router = express.Router();
const Category = require('../model/category');
const cat = new Category();

router.get('/', (req, res) => {

    console.log("i get here");
    res.send('return all snipplets');

});

router.get('/:id', (req, res) => {
    cat.getCategory(req.params.id)
    .then(x=>res.send(x))
    .catch(x=> res.status(500).send(x));
});

router.post('/', (req, res) => {
    cat.saveCategory(req.body)
    .then(x => {
        res.send(x);
    })
    .catch(x=> res.status(500).send(x.nessage));
});

router.put('/:id', (req, res) => {
    cat.updateCategory(req.params.id,req.body);
    res.send(`modify a snipplet with ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`delete a snipplet with id: ${req.params.id}`);
});

module.exports = router;
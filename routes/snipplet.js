const express = require('express');
const router = express.Router();
const Category = require('../model/category');
const cat = new Category();

router.get('/', (req, res) => {

    console.log("i get here");
    res.send('return all snipplets');

});

router.get('/:id', (req, res) => {

    const id = req.params.id;
    res.send(`return the snipplet with the id: ${id}`);

});

router.post('/', (req, res) => {


    cat.saveCategory(req.body);
    res.send(`request body: ${req.body.name}`);

});

router.put('/:id', (req, res) => {
    console.log(`request body ${req.body.name}`);
    res.send(`modify a snipplet with ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`delete a snipplet with id: ${req.params.id}`);
});

module.exports = router;
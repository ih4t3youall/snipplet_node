const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
//puedo usar lo de traerme la variable
const Category = require('../model/category');
const cat = new Category();

router.get('/', async (req, res) => {
    const categories = await cat.getAllCategories();
    res.send(categories);
});

router.get('/:id', (req, res) => {
    cat.getCategory(req.params.id)
    .then(x=>res.send(x))
    .catch(x=> res.status(500).send(x));
});

router.post('/',auth, (req, res) => {
    cat.saveCategory(req.body)
    .then(x => {
        res.send(x);
    })
    .catch(
        x=> {
            res.status(500).send(x.message);
    });
});

router.put('/:id',[auth,admin], (req, res) => {
    cat.updateCategory(req.params.id,req.body);
    res.send(`modify a snipplet with ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    cat.deleteCategory(req.body);
    res.send(`delete a snipplet with id: ${req.params.id}`);
});

module.exports = router;
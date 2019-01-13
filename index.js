const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
const facade = require('./test/facade');
const snipplet = require('./routes/snipplet');
const Category = require('./model/category');
const cat = new  Category();

const app = express();

//app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

app.use(helmet());
app.use(morgan('tiny'));
app.use(facade);
app.use('/api/snipplet',snipplet);

//cat.getAllCategories();
const categor = new Category({

    title: 'categoria1',
    snipplets: [{ title: 'aSnipplet', content: 'aSnipplet' },
    { title: 'aSnipplet2', content: 'aSnipplet2' }
    ]
});
//cat.updateCategory('5c38c5cad61c6e90ec33a8d9',categor);


const port = process.env.NODE_PORT || 3000;
app.listen(port,()=>{

    console.log(`Snipplet node is started up and running in port ${port}`);

});


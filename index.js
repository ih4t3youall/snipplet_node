
const config = require('config');
const express = require('express');
//look at joi-password-complexity
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
//const facade = require('./test/facade');
const snipplet = require('./routes/snipplet');
const Category = require('./model/category');
const users =  require('./routes/users');
const auth = require('./routes/auth');
const cat = new  Category();

const app = express();
if(!config.get('jwtPrivateKey')){
    console.error('FATAL  ERROR jwtPrivateKey is not defined.')
    process.exit(1);
}

//app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/snipplet',snipplet);
app.use('/api/users',users);
app.use('/api/auth',auth);

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


const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
const facade = require('./test/facade');
const snipplet = require('./routes/snipplet');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(facade);
app.use('/api/snipplet',snipplet);





const port = process.env.NODE_PORT || 3000;
app.listen(port,()=>{

    console.log(`Snipplet node is started up and running in port ${port}`);

});


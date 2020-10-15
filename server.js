const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/database'); //connection to database
const inputCheck = require('./utils/inputCheck');


//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// const htmlRoutes = require('./routes/htmlRoutes');

// catch all route
app.use((req,res) => {
    res.status(404).end();
});

//start server after the DB connection is made
db.on('open', () =>{
//port listener
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
    });
});
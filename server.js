const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req,res) => {
    res.status(404).end();
});


//port listener
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})
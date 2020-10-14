const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/database'); //connection to database
const inputCheck = require('./utils/inputCheck');

const apiRoutes = require('./routes/apiRoutes');
app.use('./api', apiRoutes);

// const htmlRoutes = require('./routes/htmlRoutes');
//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());



//routes for all parties
app.get('/api/parties', (req, res) => {
  const sql = `SELECT * FROM parties`;
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows
    });
  });
});

// get by party id
app.get('/api/party/:id', (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if(err) {
      res.status(400).json({error: err.message});
      return;
    }

    res.json({
      message: 'success',
      data: row
    });
  });
});

//delete party
app.delete('/api/party/:id', (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.run(sql, params, function(err, result) {
    if(err) {
      res.status(400).json({ error: err.message});
      return;
    }

    res.json({
      message: 'successfully deleted', changes: this.changes
    });
  });
});

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
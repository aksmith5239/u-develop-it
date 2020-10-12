const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const sqlite3 = require('sqlite3').verbose();

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const db = new sqlite3.Database('./db/election.db', err => {
    if(err) {
        return console.error(err.messsage);
    }
    console.log('Connected to the election database');
});

//get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
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

  app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates 
                 WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: row
      });
    });
  });

//delete a candidate
// db.run(`DELETE FROM candidates WHERE id = ?`, 1 , function(err, result){
//     if(err) {
//         console.log(err);
//     }
//     console.log(result, this, this.changes);
// });

//create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];
// //ES5 function to use this
// db.run(sql, params, function(err, result) {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result, this.lastID);
// });

//catch all route
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
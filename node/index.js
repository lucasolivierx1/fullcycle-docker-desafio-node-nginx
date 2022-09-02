const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: '123123',
  database: 'nodedb',
};

app.get('/', (req, res) => {
    getPeople(res);
});

app.listen(PORT, () => {
  console.log('STARTED AT ' + PORT);

  insertPeople("Lucas")
  insertPeople("Wesley")
  insertPeople("Full Cycle")
  insertPeople("Node")
  insertPeople("Nginx")
});

async function insertPeople(name) {
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO people(name) values('${name}')`;
  connection.query(sql);
  connection.end();
}

function getPeople(res) {    
  const connection = mysql.createConnection(config);
  const sql = `SELECT name FROM people`;  
  
  connection.query(sql, (error, results, fields) => {
    if (error) {
      throw error
    };
    
    let start = "<p>"
    let end = "</p>"

    let tableResult = start;
    for(let people of results) {      
        tableResult += `<p> ${people.name} </p>`;
    }
    tableResult += end;
    res.send(`
    </p>

        <p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p>

    <p> ` + tableResult);    
  });   
  connection.end();
}
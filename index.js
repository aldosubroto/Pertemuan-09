var http = require('http')
var mysql = require('mysql')
var express = require('express')
var app = express()
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var conn = mysql.createConnection({
    host : "localhost", //nama host database sql
    user :"root",// user mysql
    password :"", //password mysql
     database : "myDB" // database mysql
})

conn.connect((err)=>{
    if(err)
        console.log("Problem with MySQL"+ err);
    else 
        console.log("Connected with database");
        // conn.query("CREATE TABLE MyGuests (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, email VARCHAR(50), req_time TIMESTAMP)", (err,result)=>{
        //     if(err)
        //         console.err('Error creating tabel'+ err)
        //     else 
        //     console.log('Database created sucessfully')
        // })

        // latihan 6.12 
        app.post('/myguests',(req, res)=>{
            var firstname = req.body.firstname
            var lastname = req.body.lastname
            var email = req.body.email
            var query ="INSERT INTO myguests(firstname, lastname, email) VALUES('"+ firstname + "','"+ lastname + "','" + email +"')"
            conn.query(query, (err,result)=>{
                if(err)
                    res.json(err)
                else 
                    res.json(result)
            })
        })
// latihan 6.13
        app.delete('/myguests/:id',(req,res)=>{
            var id = req.params.id
            var query = "DELETE FROM myguests WHERE id = "+ id
            conn.query(query, (err, result)=>{
                if(err)
                    res.json(err)
                else 
                res.json(result)
            })
        })
//latihan 6.14
        app.put('/myguests/:id',(req,res)=>{
            var id = req.params.id
            var firstname = req.body.firstname
            var lastname = req.body.lastname
            var email = req.body.email
            var query = "UPDATE myguests SET firstname = '" + firstname +"', lastname = '" + lastname + "', email = '" + email +
             "'WHERE id =" + id
             conn.query(query, (err, result)=>{
                if(err)
                    res.json(err)
                else 
                res.json(result)
            })

        })

//latihan 6.15 
        app.get('/myguests',(req,res)=>{
            var query ="SELECT * FROM myguests LIMIT 3"
            conn.query(query, (err, rows)=>{
               res.json(rows)
            })
        })
        http.createServer(app)
        .listen(8000,()=>{
            console.log('Server is running on port 8000')
        })

      
})
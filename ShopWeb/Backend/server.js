const express = require('express');
const mySQL = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
//database info
const db = mySQL.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"shopweb"
})

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5175',
    credentials: true
}));
app.get('/things',(req,res)=>{
    const sql ="SELECT * FROM things";
    db.query(sql,function(err,data){
        if(err) throw err;
        res.send(data)
    });
});
app.post('/getCart',(req,res)=>{
    const sql ="SELECT * FROM `carts` WHERE `user_email`= ? ";
    db.query(sql,[req.body.email],function(err,data){
        if(err) throw err;
        res.send(data)});
});

app.post('/users',(req,res)=>{
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err) return res.json("Error");
        if(data.length>0){
            return res.json("Login Successfully")
        } else {
            return res.json("No record")
        }
    })
})
app.post('/addCart',(req,res)=>{
    const sql = "INSERT INTO `carts`(`user_email`, `product_id`, `unique_id`) VALUES (?, ?,?) ";
    db.query(sql,[req.body.email,req.body.product,parseInt(Math.random()*1000)],(err,data)=>{
        if (err){
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.post('/removeCart',(req,res)=>{
    
    const sql = 'DELETE FROM `carts` WHERE `unique_id` = ?';
    var id = req.body.unique_id;
    console.log(req.body.unique_id);    
    
    db.query(sql,[id],function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ' + results.affectedRows + ' rows'); 
        return res.json 
    });
    
})



app.listen(8081,()=>{
    console.log("Listening");
})
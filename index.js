require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./src/database");
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server is running...");
})
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// session
const session = require("express-session");
app.use(
    session({
        resave: true,
        saveUninitialized:true,
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 3600000, // miliseconds
            secure: false
        }
    })
);


app.get("/",function(req,res){
    const Product = require("./src/models/product");
    Product.find({})
        .then(rs=>{
            res.render("home",{
                products: rs
            })
        })
        .catch(err=>{
            res.send(err);      
        })

})
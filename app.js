var express=require("express");
var app=express();
var router=express.Router();
var multer=require("multer");
var upload=multer({dest:"public/uploads/"});
var db;
var imgResult;
var bodyParser=require('body-parser');
var MongoClient=require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/",(err,database)=>{
    if(err)console.log(err);
    db=database;
//only mongo db starts start the web server.
   
});

app.listen(3000,function(){
    console.log("Web server is listining on port 3000");
});

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res)
{
   getQuotes(req,res);
//res.send("Hello world!");
//res.sendFile(__dirname+"/index.html");

});

app.get("/",function(req,res,next){
    res.render("index.ejs",{title:"Express"});
});

app.post("/",upload.any(),function(req,res,next){
   // res.send(req.files);
   insertQuotes(req,res);

});
app.get("/getPictures",function(res,req,next){
    //res.send()
    getQuotes(res,req);
});

function getQuotes(req,res)
{
    var cursor=db.collection("images").find().toArray(function(err,results)
    {
        if(err)console.log(err);
        imgResult=results;
        res.render("index.ejs",{images:imgResult});
       
    });
}
function insertQuotes(req,res)
{
    db.collection("images").save(req.body,function(err,result)
    {
        if(err)console.log(err);
        console.log(result);
        res.redirect("/");
    });
}

module.exports=router;

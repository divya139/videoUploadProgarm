var express=require("express");
var app=express();
var router=express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var multer=require("multer");

var db;
var imgResult;
var imgPath;
var bodyParser=require('body-parser');
app.use(bodyParser());
/* var MongoClient=require("mongodb").MongoClient; */

var ffmpeg = require('fluent-ffmpeg');

/* MongoClient.connect("mongodb://localhost:27017/",(err,database)=>{
    if(err)console.log(err);
    db=database;
//only mongo db starts start the web server.
   
}); */

//mongoose.connect('localhost', 'testing_storeImg');


/* var Schema = new Schema(
    { img: 
        { data: Buffer, contentType: String }
    }
  );
  var Items = mongoose.model('Clothes',Schema); */

var storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"public/uploads/");
    },
    filename : function(req,file,cb)
    {
        cb(null, file.originalname);
        imgPath=file.originalname;
        //console.log(imgPath);
    }
});


app.listen(3000,function(){
    console.log("Web server is listining on port 3000");
});

var upload=multer({storage : storage});
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res,next){
    res.render("index.ejs",{title:"Express"});
});

app.post("/images", upload.any(),function(req,res,next){
    createThumbnail("C:/Users/User/videoUploadProgram/public/uploads/"+imgPath, imgPath.replace(".mp4",".jpg") ,"public/uploads");
   
    console.log();  
    res.render("/")  
   //res.send(req.files);

  
  // insertQuotes(req,res);
 

});
app.get("/images",function(res,req,next){
    //res.send()
    //getQuotes(res,req);
});

/* function getQuotes(req,res)
{
    var cursor=db.collection("images").find().toArray(function(err,results)
    {
        if(err)console.log(err);
        imgResult=results;
        console.log("Inside this method");
        res.render("index.ejs",{images:imgResult});
       
    });
} */

/* function insertQuotes(req,res)
{
    db.collection("images").insert(req.body.originalname,function(err,result)
    {
        if(err)console.log(err);
        console.log(req.body.data.originalname);
        res.redirect("/");
    });
} */

// function insertQuotes(req,res,imgPath)
// {
//     console.log(imgPath);
//     db.collection("images").save("C:/Users/User/videoUploadProgram/public/uploads/"+imgPath,function(err,result)
//     {
//         if(err)console.log(err);
//         console.log(req.body);
//         res.redirect("/");
       
//     });
//    console.log(req.files.originalname);
//    var imgName=req.files.originalname
//     var newItem = new Items();
//     newItem.img.data = fs.readFileSync("C:/Users/User/videoUploadProgram/public/uploads/"+imgPath)
//     console.log(newItem.img.data);
//     newItem.img.contentType = 'image/png';
//     newItem.save();
//     res.redirect("/");
//}
function createThumbnail(vidpath, thumbnailname, outputpath)
{
    var command = ffmpeg(vidpath)
    .screenshots
    ({
      timestamps: ['00:05.000'],
      filename: thumbnailname,
      folder: outputpath,
      size: '320x240'
    });
}
module.exports=router;

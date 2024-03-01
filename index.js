const express= require("express");
const app=express();
const port=8080;
const path=require("path");

const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override")




app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username: "dilshadakramnew123",
        content: "Never argue with someone who believe his own lies"
    },

    {
        id:uuidv4(),
        username: "mddilshadakram123",
        content: "Delay is not denial"
    },
    {
        id:uuidv4(),
        username: "yasdanali",
        content: "Heroes don't look back at the things they destroyed"
    }


];


app.get("/posts", (req,res)=>{  // instead of post we can write anything but we follow a convention
  res.render("index.ejs",{posts}); 
});


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});



app.post("/posts",(req,res)=>{
    let {username, content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content})
    console.log(req.body);
    res.redirect("/posts");
});


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id === p.id);
   
    res.render("show.ejs",{post});
});



app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id === p.id);
    post.content=newContent;
    res.redirect("/posts");
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post}); 
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id !== p.id); 
     res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("listening to port :8080");
});
const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({exptended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));





app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

let posts=[
    {
        id:uuidv4(),
        username:"apnacollage",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"atharva",
        content:"I love wathcing virat kohli play"
    },
    {
        id:uuidv4(),
        username:"ved",
        content:"I toped in my exams"
    }
];

app.get("/posts",(req,res)=>{   // main page , all posts
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{  // add new post
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{    //redirect to main page after adding new post
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{    //see post in detail
    let {id}=req.params;
    
    let post=posts.find((p)=> id==p.id);
    
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{    //edit post
    let {id}=req.params;
    let post=posts.find((p)=> id==p.id);

    let newContent=req.body.content;
    post.content=newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{   //edit post form
    let {id}=req.params;
    let post=posts.find((p)=> id==p.id);
    
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{   //to delete a post
    let {id}=req.params;
    posts=posts.filter((p)=> id!=p.id);
    res.redirect("/posts");

});



const express=require("express")
const app=express()
const products=require("./products")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyparser=require("body-parser")
const Content=require("./schema")

console.log(Content)
app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(bodyparser.json())
app.use(cors())

mongoose.connect("mongodb+srv://Saisurya:Saisurya@cluster0.y4lnua3.mongodb.net/firstdb?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Mongodb connected sucessfully")
    })
    .catch((err)=>{
        console.log(err)
    })


app.get("/",(req,res)=>{
    res.send("Server Started Successfully")
})

app.post("/add",(req,res)=>{
    console.log("data from front end",req.body)
    const {name,passcode}=req.body
    const newData=new Content({
        name,passcode
    })
    newData.save()
    res.send("addded")
})

app.get("/retrieve",(req,res)=>{
    Content.find()
        .then(found=>res.json(found))
})

app.get("/my-products",(req,res)=>{
    res.json(products)
})

app.get("/name",(req,res)=>{
    res.send("Codegnan IT Solutions")
})

app.listen(4000,()=>console.log("Server is started"))
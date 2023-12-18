const express=require('express');
const app=express();
const port=3000;

//routes
app.get("/",(req,res)=>{
  res.send(`Hello node api `)
})

app.listen(port,()=>{
  console.log(`Server Api is running on ${port}`)
})
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

//middleware
app.use(express.json());
//routes
app.get("/", (req, res) => {
  res.send(`Hello node api `);
});
app.get("/blog", (req, res) => {
  res.send(`Hello Blog Routes.I'm Razib Ahmed`);
});
// after creating post then do it
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//now check this url- http://localhost:3000/products
//now get products by id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//now check this url- http://localhost:3000/products/anyIdhere

//after creating schema and model in productModel.js
app.post("/products", async (req, res) => {
  // console.log(req.body);
  // res.send(req.body)

  //before try catch method you must be import productModel.js

  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a products- after get products by id then do it for better understanding

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //we can't gind any products in database
    if(!product){
      return res.status(404).json({message: `can'nt find any product with ID ${id}`})
    }else{
      const updatedProduct=await Product.findById(id);
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//now time to delete products
app.delete("/products/:id", async(req,res)=>{
    try{
      const {id}=req.params;
      const product= await Product.findByIdAndDelete(id)
      if(!product){
        return res.status(400).json({message: `can'nt find any product with ID ${id}`})
      }res.status(200).json(product);
    }catch(error){
      res.status(200).json({message: error.message})
    }
})
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6advhli.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`connected to mongodb successfully`);
    app.listen(port, () => {
      console.log(`Server Api is running on ${port}`);
    });
  })
  .catch(() => {
    console.log(`Not Connected propperly`);
  });

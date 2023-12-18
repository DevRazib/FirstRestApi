const mongoose=require("mongoose");

// create schema
const productSchema=mongoose.Schema(
  {
    name:{
      type:String,
      required:[true, "Please enter a product name"]
    },
    quantity:{
      type:Number,
      required:true,
      default:0
    },
    price:{
      type:Number,
      required:true
    },
    image:{
      type:String,
      required:false
    }
  },
  {
    timestamps:true
  }
)

// create model
const Product=mongoose.model("Product", productSchema);
module.exports=Product;
// schema is created now time to use it


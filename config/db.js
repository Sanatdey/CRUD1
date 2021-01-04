module.exports = async() => {
    const mongoose = require('mongoose');
const uri = "mongodb+srv://SANAT:sanat@cluster0.mqpre.mongodb.net/todo?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    // poolSize: 10,
    // serverSelectionTimeoutMS: 10000,
    // socketTimeoutMS: 45000,
    // family: 4,
  };
    try {
   var res = await mongoose.connect( uri, options,() =>
    console.log("connected"));    
    console.log(res);

  }catch (error) { 
  console.log("could not connect");    
  }
} 


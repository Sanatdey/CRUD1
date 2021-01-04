
exports.user = function () {
    const mongoose = require("mongoose");
    //create Db Connection
    const uri = "mongodb://127.0.0.1:27017/todo";
  
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
      poolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };
  
    mongoose.connect(uri, options).then(
      (res) => {
        console.log("User Connected Successfully");
      },
      (err) => {
        console.log(err);
      }
    );
  
    const userSch = new mongoose.Schema({
      email: { type : String },
      password: { type: String },
      date: { type: Date, default: Date.now },
    });
    const user = mongoose.model("user", userSch);
    return user;
  };
  
//   exports.getDocs = (todo) => {
//       const res = todo.find();
//       return res;
//   }
  
  exports.registerUser = async(user,email,password) => {
      try {
          const ts = new user({
            email: email,
            password: password,
          });
          const res = ts.save();
          return res;
        } catch (err) {
          return false;
        }
      
  }
  
  exports.deleteUser = async(user,_id) => {
      try{
          const res = await todo.findByIdAndDelete({_id});
          return true;
      }catch(err){
          return false;
      }
  }
  
  exports.signUser = async(user,email,password) => {
      try{
          const res = user.findOne({
            email: email,
            password: password
          });
          return res;
      }catch(err){
          return false;
      }
  }

  exports.isExist = async(user,email) => {
    try{
        const res = await user.findOne({
          email: email
        });
         if(res != null){
             return true;
         }else{
             return false;
         }
    }catch(err){
        return false;
    }
  }
exports.main = function () {

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
        console.log("Todo Connected Successfully");
        console.log(uri);
      },
      (err) => {
        console.log(err);
      }
    );
  
    const blogSchema = new mongoose.Schema({
      title: { type: String, required: true },
      body: String,
      user_id : String,
      date: { type: Date, default: Date.now },
    });
    const todo = mongoose.model("todo", blogSchema);
    return todo;
  };

exports.getDocs = (todo,user_id) => {

    return todo.find({user_id});
}


exports.createDoc = (todo,tl,bd,id) => {
    try {
        const res =  new Promise((resolve,reject) => {
          const ts =  new todo({
                title: tl,
                body: bd,
                user_id: id,
              });
              const res = ts.save();
              resolve(res);
        }) ;
        res.then( (data) => {
            // console.log(data)
        });
        
        return true;
      } catch (err) {
        return false;
      }
    
}

exports.deleteDoc = (todo,_id) => {
    try{
        const res = todo.findByIdAndDelete({_id});
        return res;
    }catch(err){
        console.log(err);
        return false;
    }
}

exports.updateDoc = (todo,_id,body1) => {
    try{
        const res = new Promise((resolve,reject) => {
            const data =  todo.findByIdAndUpdate({_id,body1},{
                body: body1
            });
            resolve(data);
        });
        res.then((data) => {
            // console.log(data);
            return data;
        });
        
    }catch(err){
        console.log(err);
        return false;
    }
}
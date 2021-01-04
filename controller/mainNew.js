
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
    const res = todo.find({user_id});
    return res;
}

exports.createDoc = async(todo,tl,bd,id) => {
    try {
        const ts =  await new todo({
          title: tl,
          body: bd,
          user_id: id,
        });
        const res = ts.save();
        return true;
      } catch (err) {
        return false;
      }
    
}

exports.deleteDoc = async(todo,_id) => {
    try{
        const res = await todo.findByIdAndDelete({_id});
        return res;
    }catch(err){
        return false;
    }
}

exports.updateDoc = async (todo,_id,body1) => {
    try{
        const res = await todo.findByIdAndUpdate({_id,body1},{
            body: body1
        });
        return res;
    }catch(err){
        return false;
    }
}

exports.deleteAllDoc = (todo,user_id) => {
  try{
      const res = todo.deleteMany({user_id});
      return true;
  }catch(err){
      return false;
  }
}
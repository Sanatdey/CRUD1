
exports.user = function (mongoose) {
    
  
    const userSch = new mongoose.Schema({
      email: { type : String },
      password: { type: String },
      
    });
    const user = mongoose.model("user", userSch);
    
    return user;
  };
  
  exports.registerUser = async(user,email,password) => {
      try {
          const ts = new user({
            email: email,
            password: password,
          });
          // const res = new Promise((resolve,reject) => {
            const data = await ts.save();
          //   resolve(data);
          // });
          console.log(res);
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
  
  exports.signUser = (user,email,password) => {

    return new Promise((resolve,reject) => {
        try{
            const res =user.findOne({
                  email: email,
                  password: password
                },(err,result) => {
                    // console.log("User p:"+result);
                    resolve(result);
                    
                });

        }catch(err){
            return err;
        }
    });

  }

  exports.isExist = (user,email) => {
    return new Promise((resolve,reject) => {
        try{
            const res =user.findOne({
                  email: email
                },(err,result) => {
                    resolve(result);
                    
                });

        }catch(err){
            console(err);
        }
    });

  }


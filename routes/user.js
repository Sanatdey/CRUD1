exports.regGet = (req,res,) => {
  res.render("userReg.ejs", { data: '' });
}

exports.regPost = (req,res,emailExist,userReg,user) => {
  try {
    const result = emailExist(user, req.body.emailR);
    result.then((data) => {
      console.log(data);
      if (data == null) {
        const res1 = userReg(user, req.body.emailR, req.body.passwordR);
        console.log(res1);
      dt = "Created Successfully";
      res.render("userReg.ejs", { data: dt });      
      }else{
        dt = "User Already Exist , Please Sign In";  
        res.render("userReg.ejs", { data: dt });  
      }
    });
  } catch(err) {
    dt = "Some Error Occur";
    console.log(err);
  }
}

exports.login = (req,res,emailExist,userSign,getDocs,todoVar,user) => {
  try {
    const result = emailExist(user, req.body.emailL);
    result.then((data) => {
      // console.log("isExist ");
      if (data != null) {
        const result1 = userSign(user, req.body.emailL, req.body.passwordL);
        result1.then((data) => {
          if(data != null){
            // console.log("Go");
            // console.log("Login :" + data._id);
          req.session.uuid = data._id;
            var getDoc = new Promise((resolve, reject) => {
              const data = getDocs(todoVar, req.session.uuid);
              resolve(data);
            });
            getDoc.then((data) => {
              // console.log(data);
              
              var i;
              var title = [];
              var body = [];
              var id = [];
              var t = [];
              for (i = 0; i < data.length; i++) {
                title[i] = [data[i].title];
                body[i] = [data[i].body];
                id[i] = [data[i]._id];
                t[i] = [
                  `${data[i].date.getDate()}-${data[i].date.getMonth()}-${data[
                    i
                  ].date.getFullYear()}`,
                ];
              }
              // console.log(getDoc);
              res.render("index.ejs", { title: title, id: id, body: body, t: t,s: '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>', url: '/dec', method: 'post'  });

            });
          }else{
            dt = "Incorrect Credential";
        res.render("user.ejs", { data: dt });
          }
        });
      } else {
        dt = "User Does not Exist, please  make a account";
        res.render("user.ejs", { data: dt });
      }
    });

    console.log(req.session.uuid);
  } catch (error) {
    dt = "Some Error Occur";
    res.render("user.ejs", { data: dt });
    console.log(error);
  }
}

exports.logget = (req,res) => {
  res.render("user.ejs", { data: '' });
}

exports.logout = (res,req)  => {
  try {
    req.session.destroy(function (err) {
      if (err) {
        return res.redirect("/login");
      }
      return res.redirect("/login");
    });
  } catch(err) {
    console.log(err);
  }
}
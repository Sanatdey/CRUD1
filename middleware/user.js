exports.userAuth = (req,res,next) => {
    if(req.session.uuid == undefined){
        console.log("Not Logged In");
        return res.render('user.ejs', { data : 'Please Login Here'});
      }else{
        next();
      }
}

exports.userRedirect = (req,res,next) => {
    if(req.session.uuid != undefined){
        console.log("Logged In");
        return res.redirect("/");
      }else{
        next();
      }
}
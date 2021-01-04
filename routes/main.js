exports.home =  (req,res,getDocs,todoVar) => {
    var getDoc = new Promise(async(resolve, reject) => {
      const data = await getDocs(todoVar, req.session.uuid);
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
      res.render("index.ejs", { title: title, id: id, body: body, t: t ,s: '<i class="fa fa-sort-amount-asc"></i>',url: '/dec', method: 'post'});
    });
    // console.log(req.session.uuid);
  }

exports.addTodo = (req,res,createDoc,todoVar) => {
  try {
    var getDocs = createDoc(
      todoVar,
      req.body.id4,
      req.body.id5,
      req.session.uuid
    );
    return res.redirect("/");
  } catch(err) {
    console.log(err);
  }
  }

  exports.sortTodo =  (req,res,getDocs,todoVar) => {
    var getDoc = new Promise(async(resolve, reject) => {
      const data = await getDocs(todoVar, req.session.uuid);
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
      res.render("index.ejs", { title: title, id: id, body: body, t: t ,s: '<i class="fa fa-sort-amount-desc"></i>', url: '/',method: 'get' });
    });
    // console.log(req.session.uuid);
  }

exports.deleteTodo = (req,res,deleteDoc,todoVar) => {
  try {
  console.log('Del:'+req.body.id7);
    var getDocs = new Promise((resolve,reject) => {
      var data = deleteDoc(todoVar, req.body.id7);
    resolve(data);
    }); 
    getDocs.then((data) => {
      // console.log(data);
      return res.redirect("/");
    });

  } catch {
    console.log("Some Error Occur");
  }
  // console.log(getDocs);
}

exports.updateTodo = (req,res,updateDoc,todoVar) => {
  try {
    var getDocs = updateDoc(todoVar, req.body.id2, req.body.id3);
    return res.redirect("/");
  } catch (err){
    console.log(err);
  }
}

exports.searchIt = (req,res,searchDocs,todoVar) => {
  var getDoc = new Promise(async(resolve, reject) => {
    const data = await searchDocs(todoVar, req.body.search,req.session.uuid);
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
    res.render("index.ejs", { title: title, id: id, body: body, t: t ,s: '<i class="fa fa-sort-amount-asc"></i>',url: '/dec', method: 'post'});
  });
}

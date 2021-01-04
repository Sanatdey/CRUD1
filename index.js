const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.render("user.ejs",{data : ''});
})


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
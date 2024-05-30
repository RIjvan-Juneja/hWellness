const renderRegistation = (req,res) => {
  res.render("pages/registation.ejs");
}

const renderLogin = (req,res) => {
  res.render("pages/login.ejs");
}

const addUser = (req,res) => {
  console.log(req.body);
  res.status(200).send({status : 'ok'});
}

module.exports = { renderRegistation, renderLogin, addUser };
const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const controlGenome = require("../controllers/genome.controller");
const Genome = require("../models/genome.model");
const controlUser = require("../controllers/user.controller");

//let initialPath = path.join(__dirname, "public");
//app.use(bodyParser.json());
//app.use(express.static(initialPath));

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  /*app.get("/", (req, res) => {
          res.sendFile(path.basename("D:\\web_bio\\client\\index.html"));
      });

      app.get("/register", (req, res) => {
          res.sendFile(path.basename("D:\\web_bio\\client\\register.html"));
      });*/

  /*app.get("/login", (req, res) => {
          res.sendFile(path.join(initialPath, "login.html"));
      })*/

  //app.use(middleware.requireAuthentication());
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  //Handling user signin
  app.post("/api/auth/signin", controller.signin);

  //Handling user sign out
  app.post("/api/auth/signout", controller.signout);

  app.get("/api/auth/search/:key", async (req, res) => {
    let result = await Genome.find({
      $or: [
        {
          gen_id: { $regex: req.params.key },
        },
      ],
    });
    res.send(result);
  });

  app.get("/searchpro/:key", [authJwt.verifyToken], controlGenome.searchGenome);

  app.post("/api/auth/insert", controlGenome.createGenome);
  app.get(
    "/api/auth/showAllGene",
    [authJwt.isAdmin],
    controlGenome.showAllGene
  );

  app.delete("/api/auth/deleteUser/:id", controlUser.deleteUser);
  app.put(
    "/api/auth/updateGene/:id",
    [authJwt.isAdmin],
    controlGenome.updateGene
  );

  app.put("/api/auth/updateUser/:id", controlUser.updateUser);

  app.delete("/api/auth/deleteGene/:gen_id", controlGenome.deleteGene);
};

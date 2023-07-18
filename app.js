//  core modules
// http - launch a server, send requests
//  https - launch a secure server(SSL)
//  fs - work with the file system
//  path - work with file and directory paths
// os - work with the operating system
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// express is a function
const app = express();
// call the body parser function

// set allows us to set a value globally
// set the templating engine
// pug is a templating engine
app.set("view engine", "pug");
app.set("views", "views");

// import the routes
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
// thie static allows us to serve a static file
// the path.join is a utility function that helps us construct a path
app.use(express.static(path.join(__dirname, "public")));

// filtering allows us to only run the middleware on certain routes
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// create a 404 page
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
  console.log("404");
});

// the server takes the request and response objects
// event loop - these events keep on running as long as there are event listeners registered
// CreateServer is an event listener
// const server = http.createServer(app);

app.listen(3000);

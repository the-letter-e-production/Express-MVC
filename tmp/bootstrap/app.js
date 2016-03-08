var ExpressMVC = require('express_mvc'); //define ExpressMVC

/**
 *
 * Create our app
 *
 */
var app = new ExpressMVC.App({
    access_logging: true, //turn on access logs to STDOUT
    log_severity_level: 'debug', //display logs of severity debug or worse
    port: 3000 //listen on port 3000
});

var router = new ExpressMVC.Router('/'); //create a router in base

/**
 *
 * Add a route with an inline controller
 *
 */
router.addRoute(
    new router.Route('GET', '/', function(req, res){
        res.write('Welcome to ExpressMVC!'); //write some text to the user
        res.end(); //close the connection
    })
);

/**
 *
 * Add a route with a explicit file controller
 *
 */
router.addRoute(
    new router.Route('GET', '/file', '/controllers/File.js') //controllers/File.js
);

/**
 *
 * Add a route with an magic controller
 *
 */
router.addRoute(
    new router.Route('GET', '/magic') //controllers/Magic.js
);

/**
 *
 * Add a route with a view and static files
 *
 */
app.static('static');
app.set('view engine', 'ejs'); //allow views with ejs
router.addRoute( //add the route
    new router.Route('GET', '/view', function(req, res){
        res.render('index', {foo: 'bar'}); //render the view - views/index.ejs
    })
);

app.addRouter(router); //add the router to the app
app.use(ExpressMVC.Util.exception.middleware); //turn on app level exception handling

app.listen(); //start listening

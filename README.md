Express MVC 
=======

![build status](https://api.travis-ci.org/the-letter-e-production/Express-MVC.svg?branch=npm)

## Versions ##
 1. **npm** - *current stable build*
 2. **master** - *old stable build*
 3. **edge** - *current development build*

## Features ##

 1. Advanced routing
 2. Controllers
 3. Access logging
 6. Views w/ EJS
 7. Static Resources
 8. Middleware
 9. Utilities
 10. Unit Testing Support via Intern


----------


## Getting Started ##

**Install the app**:  `npm install express_mvc`

**Create a basic mvc bootstrap**:
```
var ExpressMVC = require('express_mvc'), //create mvc object
app = new ExpressMVC.App({ //initialize mvc object + options
    port: 80, //serve app on port 80
    ip: '127.0.0.1', //optionally bind the ip to a specific ip
    access_logging: true, //turn on access logging
    access_log_dir: './logs', //set logs directory
    parse_body: { //allow body parsing
        json: true, //json in body, okay
        urlencoded: { //urlencoded body, okay
            extended: true
        }
    }
}),
router = new ExpressMVC.Router, //create router instance
util = ExpressMVC.Util; //access express mvc utils
```

**Build your first route**:
```
/**
 *
 * Create a route
 *
 */
var home_route = new router.Route('GET', '/', function(req, res){
    res.write("Welcome home!");
});

/**
 *
 * Add Route to Router
 */
router.addRoute(home_route);
```

**Add Router to App**
```
/**
 *
 * Add Router
 *
 */
app.addRouter(router);
```

**Start Listening**:
```
/**
 *
 * Listen
 *
 */
app.listen();
```

**Special Routing**:
You are not required to provide a callback function to the `Route` object, in fact, there are two alternate options...

 

 1. Controller path
 2. **Magic** Controller's
 3. Multiple Routers

## Advanced Routing ##
All controllers are assumed to be in the app root in a directory called, `controllers`, this is the only restriction of controllers locations.

**Controller Path**:
Look for `./controllers/Home.js`
```
new router.Route('GET', '/', '/Home.js');
```

**Magic Controllers**:
Magic controllers follow a special syntax based on your route... the last segment denotes the file name and any subsequent segments are a subfolder structer. Parameters are stripped in this context.  **"/" Defaults to Home.js**

Examples
```
//controllers/User.js
new router.Route('GET', '/user');

//controllers/User/Profile.js
new router.Route('User Profile', 'GET', '/user/profile');

//controllers/User/Profile.js
new router.Route('GET', 'user/profile/:uid');
```

**Multiple Routers**:
With Express MVC you can serve multiple routers from different paths easily with one app file
```
router_a = new ExpressMVC.Router('/a');
router_b = new ExpressMVC.Router('/b');

router_a.addRoute(new router.Route('GET', '/index', function(req, res){ //browse to: /a/index
    res.write("Homepage A!");
    res.end();
}));

router_b.addRoute(new router.Route('GET', '/index', function(req, res){ //browse to: /b/index
    res.write("Homepage B!");
    res.end();
}));

app.addRouter(router_a);
app.addRouter(router_b);

app.listen();
```

## Controllers ##
Controllers are created in the same way as an express controller using the `function(req, res)` syntax, with 1 subtle difference... method grouping.

Take for example, the following routing setup
```
router.addRoute(new router.Route('GET', '/user'));
router.addRoute(new router.Route('POST', '/user'));
router.addRoute(new router.Route('DELETE', '/user'));
```

All of the routes above will share the same magic controller...so **HOW** do we determine functionality for each method? Lets see below...

*controllers/User.js*
```
module.exports = {
    'GET': function(req, res){},
    'POST': function(req, res){},
    'DELETE': function(req, res){}
}
```

You now have all methods for an api group in one convenient controller, with all of the standard express usage available in your request and response objects. It's that simple!

If you want all methods to go through a single function you can do the following...

*controllers/User.js*
```
module.exports = function(req, res){};
```

Both syntax will work without any configuration by you!

## Access Logging ##
Access logging is managed by [morgan](https://github.com/expressjs/morgan%20morgan)

Currently access logging does not offer much customization, but more may be added upon request

## Views w/ EJS ##
Currently Express MVC is set up to work with EJS by default and we've made it quite easy to do. Simply add the following to your app...
```
app.set('view engine', 'ejs');
```

You can then render views stored in `./views`
```
res.render('view', {foo: 'bar'});
```

## Static Resources ##
You can easily set up static resources for your app as follows
```
app.static('static/css', '/css'); //./static/css -> /css
app.static('static/images', '/images'); //./static/images -> /images
app.static('static/fonts', '/fonts'); //./static/fonts -> /fonts
app.static('static/icons', '/icons'); //./static/icons -> /icons
app.static('static/js', '/js'); //./static/js -> /js
app.static('static/libs', '/libs'); //./static/libs -> /libs
app.static('static/views', '/views'); //./static/views -> /views
```

## Middleware ##
We have simply exposed the standard middleware implementation from Express.JS and you can use it as you normally would at the app and router level...
```
//app middleware
app.use(function(req, res, next){
    //do middleware stuff here...
    next();
});

//router middleware
router.use(function(req, res, next){
    //do middleware stuff here...
    next();
});
```

*NOTE:* Router middleware executes in the order it is added in relationship to the routes and will not execute after a controller _UNLESS_ you pass the next argument to the controller callback.
```
router.use(function(req, res, next){
    //runs before route
    next(); //go to route
});
router.addRoute(new router.Route('GET', '/', function(req, res, next){
    //the route!
    res.write("Welcome home!");
    res.end();
    
    next(); //if you don't call next, the following middleware will not execute
});
router.use(function(req, res, next){
    //runs after the route
    next(); //continue routing after this
});
```

## Utilities ##
ExpressMVC comes with some nifty utilities that are used internally and we've made available for consumption. These utilities will continue to grow as needed. Check out the current utilities below:

```
var dir_util = ExpressMVC.Util.dir; //Directory and path based utilities
    dir_util.approot(); //get the path of the application root

var exception util = ExpressMVC.Util.exception; //Exception handling utilities
    throw exception_util.factory('default', 'My error here!'); //throws a new exception of type 'Default Exception'
    app.use(exception.util.middleware); //handles exceptions thrown by the exception util and makes crashes the app when necessary
```

*Exception Util in depth...*

```
throw exception_util.factory(type, message, code, scope, safe);
```

- _type:_ Exception type (default, database or http). If you don't specify an ExpressMVC predefined type, you can instead provide a path (My/Custom/Error, looks for approot/exceptions/My/Custom/Error.js)
- _message:_ The error message logged to console and sometimes displayed to the end user
- _code:_ The http code to send to the end user (200, 301, 403, 404, 500, etc...)
- _scope:_ The scope of the error (public,private). Public scope will show the error message to the end user and private will show an ambiguous error message.
- _safe:_ A boolean value telling the middleware if it's safe to let your app persist or not. For errors that are minor and you know they are safe, set to true to avoid restarting your app, otherwise set to false and the app will crash


## Unit Testing Support ##
Here at ExpressMVC we are working on making your CI lifecycle easier than ever and we've started by adding InternJS awareness to our Directory Utility. Currently `ExpressMVC.Util.dir.approot()` pulls the approot by using process.argv[1], which we've found is reliable in most circumstances, however when running unit tests with Intern that path becomes the location of the intern-client file and breaks all of our approot() dependencies.

To fix the issue simply add a `path` argument to your intern configuration and ExpressMVC will override approot accordingly!

```
//INTERN EXAMPLE
./node_modules/.bin/intern-client config=tests/intern.js path=/absolute/path/to/my/app
``` 

That's all there is to it! Now during your tests, ExpressMVC.Util.dir.approot() will return `/absolute/path/to/my/app`. Enjoy increased code coverage with [Intern](https://theintern.github.io/) today!




## Questions, Comments ##
We hope this documentation is sufficient to get you started with Express MVC. However, if you have any questions or require help please open a ticket on [GitHub](https://github.com/the-letter-e-production/Express-MVC)


----------


Built under the [ISC](http://opensource.org/licenses/ISC) License
